import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setU(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    clearU(state, action) {
      return null
    },
  },
})

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(setU(user))
  }
}

export const clearUser = () => {
  return async (dispatch) => {
    dispatch(clearU())
  }
}

export const { setU, clearU } = userSlice.actions

export default userSlice.reducer
