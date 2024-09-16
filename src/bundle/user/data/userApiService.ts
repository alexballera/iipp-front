import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APP_ROUTE } from 'src/@core/constants'
import { setBaseQuery } from 'src/@core/utils'
import { UserDataType } from '../domain/userModel'

const URL = `${process.env.NEXT_PUBLIC_API_URL}${APP_ROUTE}`

//** RTK API*/
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery(setBaseQuery(URL)),
  tagTypes: ['user'],
  refetchOnMountOrArgChange: false,
  endpoints: builder => ({
    getUser: builder.query<UserDataType, void>({
      query: () => ({
        url: '/perfil',
        method: 'get'
      })
    }),
    updateUser: builder.mutation<UserDataType, UserDataType>({
      query: body => ({
        url: `/perfil/${body.usuario}`,
        method: 'put',
        body
      })
    })
  })
})
export const { useGetUserQuery, useUpdateUserMutation } = userApi

export const { getUser } = userApi.endpoints
