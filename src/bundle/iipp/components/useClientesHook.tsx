import { useRouter } from 'next/router'
import { AccionesEnum } from 'src/@core/enums'

function useClientesHook(accion: string, nombre: string) {
  const router = useRouter()

  const breadCrumbCrear = [
    {
      id: '01',
      text: AccionesEnum.CREAR_IIPP
    }
  ]

  const breadCrumbEditar = [
    {
      id: '01',
      text: nombre || '',
      link: () => router.back()
    },
    {
      id: '02',
      text: AccionesEnum.EDITAR_IIPP
    }
  ]

  const getBreadCrumb = () => {
    if (accion === AccionesEnum.CREAR_IIPP) return breadCrumbCrear
    if (accion === AccionesEnum.EDITAR_IIPP) return breadCrumbEditar

    return []
  }

  return {
    getBreadCrumb
  }
}
export default useClientesHook
