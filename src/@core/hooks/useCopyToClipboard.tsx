import { useState } from 'react'

function useCopyToClipboard() {
  const [tooltipText, setTooltipText] = useState<string>('Copiar')

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setTooltipText('¡Copiado!')

    setTimeout(() => {
      setTooltipText('Copiar')
    }, 2000)
  }

  return {
    handleCopyToClipboard,
    tooltipText
  }
}

export default useCopyToClipboard
