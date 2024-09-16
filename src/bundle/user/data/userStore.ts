import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  UserDataIS as user,
  userDataMeMeIS as userDataMeMs,
  UserDataType,
  userPictureMeMsIS as userPictureMeMs
} from '../domain/userModel'
import { ResponseMeMs, ResponsePhotoMeMs } from './msGraphApiService'

const initialState = {
  userDataMeMs,
  userPictureMeMs,
  user
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserDataMeMs: (state, action: PayloadAction<ResponseMeMs>) => {
      state = {
        ...state,
        userDataMeMs: action.payload
      }

      return { ...state }
    },

    setUserPhotoMeMs: (state, action: PayloadAction<ResponsePhotoMeMs>) => {
      state = {
        ...state,
        userPictureMeMs: action.payload
      }

      return { ...state }
    },

    setUserData: (state, action: PayloadAction<UserDataType | null>) => {
      state = {
        ...state,
        user: action.payload
      }

      return { ...state }
    }
  }
})

export const { setUserDataMeMs, setUserPhotoMeMs, setUserData } = userSlice.actions
export default userSlice.reducer
