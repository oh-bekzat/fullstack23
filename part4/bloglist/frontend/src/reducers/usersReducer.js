import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUs(state, action) {
      return action.payload
    },
  },
})

export const setUsers = (user) => {
  return async (dispatch) => {
    dispatch(setUs(user))
  }
}

export const { setUs } = userSlice.actions

export default userSlice.reducer
