import { Typography } from '@mui/material'

const styles = {
  subTitle: { fontSize: 18, fontWeight: 500 }
}

type PropTypes = {
  text: string
}
function TitleSectionForm({ text }: PropTypes) {
  return <Typography sx={styles.subTitle}>{text}</Typography>
}
export default TitleSectionForm
