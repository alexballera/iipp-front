//** Base Imports */
import { ReactNode, memo } from 'react'

//** MUI Imports */
import { Grid, Stack, Typography } from '@mui/material'

const styles = {
  container: {
    mt: 4,
    mb: 10
  },
  textoPrincipal: {
    fontSize: 22,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.25px',
    ml: 1
  },
  textoSecundario: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: '20px',
    letterSpacing: '0.25px',
    mt: 6
  }
}

type HeaderCompTypes = {
  icon: ReactNode
  textoPrincipal: string
  textoSecundario?: string
  acciones?: ReactNode
}

function HeaderComponent({ icon, textoPrincipal, textoSecundario, acciones }: HeaderCompTypes) {
  return (
    <header>
      <Grid container direction='row' alignItems='center' sx={styles.container}>
        <Grid item xs={6}>
          <Stack direction='column'>
            <Stack direction='row'>
              {icon}
              <Typography sx={styles.textoPrincipal}>{textoPrincipal}</Typography>
            </Stack>
            {textoSecundario && (
              <Typography sx={styles.textoSecundario}>{textoSecundario}</Typography>
            )}
          </Stack>
        </Grid>
        {acciones && (
          <Grid item xs={6}>
            <Stack direction='row' alignItems='center' justifyContent='flex-end'>
              {acciones}
            </Stack>
          </Grid>
        )}
      </Grid>
    </header>
  )
}
export default memo(HeaderComponent)
