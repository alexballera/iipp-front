export const showArrayComma = (arr: string[], i: number) => {
  return arr && arr?.length === i + 1 ? '' : ', '
}

export const showStringComma = (str: string, i: number) => {
  return str && str?.length === i + 1 ? '' : ', '
}
