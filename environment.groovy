//archivo que usa repo creator para colocar dentro del repo de la aplicación
def setenv(def file_stack="null")
{
  if (env.BRANCH_NAME == "develop" || env.BRANCH_NAME =~ "feature/*")
  {
    sh 'echo "$(date) : Seteando variables - BRANCH = ${BRANCH_NAME}"'

    env.PROJECT="mc-custodia"
    env.STACK="${ENV}-frontend-${PROJECT}"
    env.SUBDOMAIN="${ENV}-${PROJECT}"
    env.DOMAIN="desa-comafidigital.com"
    env.BUCKET="${ENV}-comafi-base-deploy"
    env.CERTIFICATE_ARN="6c9bb0c4-55d1-4026-afb2-3a3e72b9632c"
    env.API_DOMAIN="${ENV}-api.${DOMAIN}"
    env.AZURE_CLIENT_ID="03b6e09c-488b-475f-91fa-86fec020b1a2"
    env.AZURE_AUTHORITY = "https://login.microsoftonline.com/b8edbb91-3c10-49ab-87ed-a8ee90562bc9"

    this.println("Stack: ${STACK}")

    env.parameter_overrides="Project=${PROJECT} Environment=${ENV} Domain=${DOMAIN} SubDomain=${SUBDOMAIN} AcmCertificateArn=${CERTIFICATE_ARN}"

    env.NEXT_PUBLIC_ENVIRONMENT="${ENV}"
    env.NEXT_PUBLIC_API_URL = "https://${API_DOMAIN}"
    env.NEXT_PUBLIC_AZURE_CLIENT_ID = "${AZURE_CLIENT_ID}"
    env.NEXT_PUBLIC_AZURE_AUTHORITY = "${AZURE_AUTHORITY}"
    env.NEXT_PUBLIC_DOMAIN="https://${SUBDOMAIN}.${DOMAIN}"
    env.NEXT_PUBLIC_OWNER_DEPLOY= env.BRANCH_NAME.replace("feature/", "")
    env.NEXT_PUBLIC_DATETIME_DEPLOY= new Date().format('yyyy/MM/dd-HH:mm:ss')

    env.origen_web_s3="out/"
    env.cf_invalidate=true

    return false
  }
  else
  {
    echo "ERROR: No entro a ninguna condicion de branch = ${env.BRANCH_NAME}"
    devops.fail()
  }
}
return this;
