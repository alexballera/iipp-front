#!/bin/bash
#######################################################

YELLOW='\033[1;33m'
GREEN="\[\033[0;32m\]"
NC='\033[0m' # No Color

# VALIDAR SI AWS CLI ESTA INSTALADO
if ! [ -x "$(command -v aws)" ]; then
    date=:: $(date '+%Y-%m-%d %H:%M:%S')
    echo "$date [ ERROR ] aws cli not found"
    exit 1
fi
# VALIDAR SI SAM CLI ESTA INSTALADO
if ! [ -x "$(command -v sam)" ]; then
    date=:: $(date '+%Y-%m-%d %H:%M:%S')
    echo "$date [ ERROR ] sam cli not found"
    exit 1
fi
# VALIDAR SI NPM ESTA INSTALADO
if ! [ -x "$(command -v npm)" ]; then
    date=:: $(date '+%Y-%m-%d %H:%M:%S')
    echo "$date [ ERROR ] npm not found"
    exit 1
fi
#######################################################

# VARIABLES STANDARD
ENV='predev'
AWS_PROFILE='comafi-dev-key'
REGION="us-east-1"
BUCKET="$ENV-comafi-base-deploy"
PROJECT="mc-custodia"
UUID=$$
STACK="$ENV-frontend-$PROJECT"
SOURCE="$(pwd)"
COST_CENTER=$PROJECT
DEPLOY_INFRA="false"

# VARIABLES ESPECIFICAS PARA EL STACK
DOMAIN="desa-comafidigital.com"
CERTIFICATE_ARN="6c9bb0c4-55d1-4026-afb2-3a3e72b9632c"
SUBDOMAIN="$ENV-$PROJECT"
BUCKET_FRONTEND="$SUBDOMAIN.$DOMAIN"
CLOUDFRONT_NAME="$ENV-$PROJECT-CloudFrontDistributionOutput"

if [ $DEPLOY_INFRA = true ]; then
  echo ":: $(date '+%Y-%m-%d %H:%M:%S') [ INFO ] :: VALIDATING TEMPLATE"
  sam validate --template "$SOURCE/cloudformations/template.yaml" --profile $AWS_PROFILE --region $REGION --debug
  echo ":: [ INFO ] :: BUILDING SAM"
  sam build -t "$SOURCE/cloudformations/template.yaml" --profile $AWS_PROFILE --region $REGION --debug
  echo ":: $(date '+%Y-%m-%d %H:%M:%S') [ INFO ] :: PACKAGING SAM PROJECT"
  sam package --profile $AWS_PROFILE --template-file "$SOURCE/.aws-sam/build/template.yaml" --output-template-file "$SOURCE/.aws-sam/build/package.yaml" --s3-bucket $BUCKET
  echo ":: $(date '+%Y-%m-%d %H:%M:%S') [ INFO ] :: DEPLOYING SAM PROJECT"
  sam deploy \
    --profile $AWS_PROFILE \
    --template-file "$SOURCE/.aws-sam/build/package.yaml" \
    --stack-name $STACK \
    --tags project=$PROJECT environment=$ENV costcenter=$COST_CENTER \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameter-overrides \
      Project=$PROJECT \
      Environment=$ENV \
      Domain=$DOMAIN \
      SubDomain=$SUBDOMAIN \
      AcmCertificateArn=$CERTIFICATE_ARN
fi

echo -e "${YELLOW} Creating .env \n =================${NC}"
touch .env
echo NEXT_PUBLIC_OWNER_DEPLOY="$USER" >> .env
echo NEXT_PUBLIC_DATETIME_DEPLOY="$(date '+%d-%m-%Y %H:%M')" >> .env

echo -e "${YELLOW} Building frontend \n =================${NC}"
npm install || exit 1
npm run build || exit 1
rm -rf .env

echo -e "${YELLOW} Describe Stack \n =================${NC}"
export CLOUDFRONT_DISTRIBUTION=`aws cloudformation describe-stacks --stack-name "$STACK" --profile $AWS_PROFILE \
--output text | grep ${CLOUDFRONT_NAME} | awk -F"\t" '{$0=$5}6'`
echo -e "${NC} Cloudfront Distribution: $CLOUDFRONT_DISTRIBUTION"

echo -e "${YELLOW} Deploy to S3 FE \n =================${NC}"
aws s3 cp "$PWD/out/" "s3://$BUCKET_FRONTEND/" --recursive --cache-control max-age=3600 --profile $AWS_PROFILE

echo -e "${YELLOW} Creating Invalidation \n =================${NC}"
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION --path "/*" --profile $AWS_PROFILE

echo -e "${GREEN} Finished deploy \n ====================="

# LIMPIEZA
rm -rf "$(pwd)/.aws-sam"
rm -rf "$(pwd)/out"
rm -rf "$(pwd)/.next"

exit 0
