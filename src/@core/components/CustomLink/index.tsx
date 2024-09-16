import { Stack, Typography } from '@mui/material'
import { Launch } from 'mdi-material-ui'
import Link from 'next/link'
import ShowDataLabel from '../ShowDataLabel'

type CustomLinkProps = {
  label?: string
  href: string
  text: string
}
function CustomLink({ label, href, text }: CustomLinkProps) {
  return (
    <>
      {label && <ShowDataLabel label={label} />}
      <Link href={href} passHref>
        <Stack direction='row' spacing={2} sx={{ cursor: 'pointer' }}>
          <Typography
            sx={{
              color: theme => theme.palette.info.main,
              '&:hover': { color: theme => theme.palette.info.light }
            }}
            variant='body2'
          >
            {text}
          </Typography>
          <Launch
            sx={{
              color: theme => theme.palette.info.main,
              '&:hover': { color: theme => theme.palette.info.light },
              fontSize: 20
            }}
          />
        </Stack>
      </Link>
    </>
  )
}
export default CustomLink
