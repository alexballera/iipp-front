import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import ShowDataLabel from 'src/@core/components/ShowDataLabel'
import { DireccionDTO } from 'src/bundle/shared/domain'

type DireccionProps = {
  direccion: DireccionDTO
  title?: string
}

const DirectionComponent = ({ direccion, title }: DireccionProps) => {
  const {
    calle,
    codigo_postal,
    departamento,
    localidad,
    numero,
    pais,
    piso,
    provincia,
    telefono,
    oficina
  } = direccion

  return (
    <Card>
      <CardHeader title={title || 'Ubicación'} />
      <CardContent>
        <Grid container rowSpacing={4} columnSpacing={2}>
          <>
            {pais ? (
              <Grid item xs={12} sm={3}>
                <ShowDataLabel label='País' data={pais} />
              </Grid>
            ) : (
              <></>
            )}
            {provincia ? (
              <Grid item xs={12} sm={3}>
                <ShowDataLabel label='Provincia' data={provincia} />
              </Grid>
            ) : (
              <></>
            )}
            {localidad ? (
              <Grid item xs={12} sm={3}>
                <ShowDataLabel label='Localidad' data={localidad} />
              </Grid>
            ) : (
              <></>
            )}
            {telefono ? (
              <Grid item xs={12} sm={3}>
                <ShowDataLabel label='Teléfono' data={telefono} />
              </Grid>
            ) : (
              <></>
            )}
            {calle ? (
              <Grid item xs={12} sm={9}>
                <ShowDataLabel
                  label='Dirección'
                  data={`${calle || ''} ${numero || ''} ${piso || ''}${departamento || ''} ${
                    oficina || ''
                  } ${codigo_postal ? 'CP ' + codigo_postal : ''}`}
                />
              </Grid>
            ) : (
              <></>
            )}
          </>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default DirectionComponent
