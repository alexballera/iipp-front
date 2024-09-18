import { useRouter } from 'next/router'
import { AccionesEnum } from 'src/@core/enums'

function useClientesHook(accion: string, nombre: string) {
  const router = useRouter()

  const breadCrumbCrear = [
    {
      id: '01',
      text: AccionesEnum.CREAR_CLIENTE
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
      text: AccionesEnum.EDITAR_CLIENTE
    }
  ]

  const getBreadCrumb = () => {
    if (accion === AccionesEnum.CREAR_CLIENTE) return breadCrumbCrear
    if (accion === AccionesEnum.EDITAR_CLIENTE) return breadCrumbEditar

    return []
  }

  return {
    getBreadCrumb
  }
}
export default useClientesHook
