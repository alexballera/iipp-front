import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser'
import { loginRequest, msalConfig } from 'src/@core/configs/auth'
import { TokenEnum } from 'src/@core/enums'

export class MsalUtils {
  private static _instance: IPublicClientApplication

  public static getAccessToken(): void {
    this._instance = new PublicClientApplication(msalConfig)

    this._instance
      .acquireTokenSilent({
        ...loginRequest,
        account: this._instance.getAllAccounts()[0]
      })
      .then(authResponse => {
        localStorage.setItem(TokenEnum.access_token, authResponse.accessToken)
      })
  }
}
