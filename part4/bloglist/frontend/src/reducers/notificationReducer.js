import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    clearNotification(state, action) {
      return ''
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const likeNotification = (blog) => {
  return async (dispatch) => {
    dispatch(setNotification(`You liked '${blog.title}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const createNotification = (blog) => {
  return async (dispatch) => {
    dispatch(setNotification(`Blog '${blog.title}' was added`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const wrongInitialsNotification = () => {
  return async (dispatch) => {
    dispatch(setNotification('Wrong username or password'))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const removeNotification = (blog) => {
  return async (dispatch) => {
    dispatch(setNotification(`Blog '${blog.title}' was removed`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
