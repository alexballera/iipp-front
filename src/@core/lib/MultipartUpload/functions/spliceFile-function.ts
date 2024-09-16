import { FileSlice } from '../types'

/**
 * @param {Blob} - file to slice
 * @param {Number} - splice size
 * @return {Array<FileSlice>}
 **/
function splitBlob(file: Blob, cSize: number): Array<FileSlice> {
  let byteIndex = 0
  const chunks = []
  let chunksAmount

  if (file.size > cSize) {
    chunksAmount = Math.ceil(file.size / cSize)
  } else {
    chunksAmount = 1
  }

  for (let i = 0; i < chunksAmount; i += 1) {
    const byteEnd = Math.ceil((file.size / chunksAmount) * (i + 1))
    chunks.push({
      number: i + 1,
      blob: file.slice(byteIndex, byteEnd),
      size: byteEnd - byteIndex
    })
    byteIndex += byteEnd - byteIndex
  }

  return chunks
}

/**
 * @param {ArrayBuffer} - file to slice
 * @param {Number} - splice size
 * @return {Array<FileSlice>}
 **/
function splitArrayBuffer(file: ArrayBuffer, cSize: number): Array<FileSlice> {
  let byteIndex = 0
  const chunks = []
  let chunksAmount

  if (file.byteLength > cSize) {
    chunksAmount = Math.ceil(file.byteLength / cSize)
  } else {
    chunksAmount = 1
  }

  for (let i = 0; i < chunksAmount; i += 1) {
    const byteEnd = Math.ceil((file.byteLength / chunksAmount) * (i + 1))
    chunks.push({
      number: i + 1,
      blob: file.byteLength > cSize ? file.slice(byteIndex, byteEnd) : file,
      size: byteEnd - byteIndex
    })
    byteIndex += byteEnd - byteIndex
  }

  return chunks
}

async function splitBlobToString(str: string, size: number): Promise<Array<FileSlice>> {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = {
      number: i + 1,
      blob: str.substr(o, size),
      size: 0
    }
  }

  return chunks
}

export { splitArrayBuffer, splitBlob as splitFile, splitBlobToString }
