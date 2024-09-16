const stractDataBase64 = (base64: string): any => {
  const base64Content = base64.split(';base64,')
  const contentType = base64Content[0].split(':')[1]
  const extension = contentType.split('/')[1]

  return {
    contentType,
    extension,
    metadata: base64Content[1]
  }
}

function blobToBase64(blob: Blob): Promise<any> {
  const reader = new FileReader()
  reader.readAsDataURL(blob)

  return new Promise(resolve => {
    reader.onloadend = () => {
      resolve(reader.result)
    }
  })
}

export { stractDataBase64, blobToBase64 }
