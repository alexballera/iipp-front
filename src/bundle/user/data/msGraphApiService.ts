import { graphConfig } from 'src/@core/configs/auth'
import store from 'src/@core/configs/store'
import { TokenEnum } from 'src/@core/enums'

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken
 */
export async function callMsGraph(accessToken: string): Promise<unknown> {
  const headers = new Headers()
  const bearer = `Bearer ${accessToken}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers
  }

  return fetch(graphConfig.graphMembersEndpoint, options)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export async function callMsMeGraph(): Promise<ResponseMeMs | undefined> {
  const userDataExists = sessionStorage.getItem('DATA_USUARIO_EXISTE')
  const { userDataMeMs } = store.getState().USER

  if (userDataExists && userDataMeMs.displayName !== '') return

  const accessToken = localStorage.getItem(TokenEnum.access_token)

  const headers = new Headers()
  const bearer = `Bearer ${accessToken}`

  headers.append('authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers
  }

  return fetch(graphConfig.graphMeEndpoint, options)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export async function getUserPhoto(): Promise<ResponsePhotoMeMs | undefined> {
  const userPhotoExists = sessionStorage.getItem('DATA_USUARIO_EXISTE')
  const { userPictureMeMs } = store.getState().USER

  if (userPhotoExists && userPictureMeMs.photo !== '') return

  const token = localStorage.getItem('access_token_rct')

  const headers = new Headers()
  const bearer = `Bearer ${token}`

  headers.append('authorization', bearer)
  headers.append('Content-Type', 'image/jpeg')

  const options = {
    method: 'GET',
    headers: headers
  }

  return fetch(`${graphConfig.graphMeEndpoint}/photo/$value`, options)
    .then(async response => {
      return response.blob().then(blob => {
        return {
          photo: URL.createObjectURL(blob)
        }
      })
    })
    .catch(() => {
      return { photo: '' }
    })
}

export interface ResponseMeMs {
  displayName: string
  givenName: string
  id: string
  jobTitle: string
  mail: string
  mobilePhone: string
  officeLocation: string
  preferredLanguage: string
  surname: string
  userPrincipalName: string
}

export interface ResponsePhotoMeMs {
  photo: string
}
