import { Configuration } from '@azure/msal-browser'

export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken'
}

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || '',
    authority: process.env.NEXT_PUBLIC_AZURE_AUTHORITY || '',
    redirectUri: process.env.NEXT_PUBLIC_DOMAIN || '',
    postLogoutRedirectUri: '/home'
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: true // Set this to "true" if you are having issues on IE11 or Edge
  }
}

export const loginRequest = {
  scopes: ['User.Read', 'openid', 'profile', 'GroupMember.Read.All']
}

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMembersEndpoint: 'https://graph.microsoft.com/beta/me/memberOf',
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me'
}
