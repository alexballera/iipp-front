export async function descargarArchivo(res: any, nombre: string, extension: string) {
  let resp: Response

  const link: HTMLAnchorElement = document.createElement('a')
  link.setAttribute('download', `${nombre}.${extension}`)

  if (!res.base64) {
    link.href = res.url_prefirmada
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
  } else {
    resp = await fetch(`data:application/${extension};base64,${res.base64}`)
    const blob1: Blob = await resp.blob()
    const url = window.URL.createObjectURL(blob1)

    link.href = url
    document.body.appendChild(link)
    link.click()
  }
}
