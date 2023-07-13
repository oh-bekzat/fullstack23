import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }
    }
})
  
export const { setNotification, clearNotification } = notificationSlice.actions

export const voteNotification = (anecdote, delay) => {
    return async dispatch => {
        dispatch(setNotification(`You voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, delay*1000)
    }
}

export const createNotification = (anecdote, delay) => {
    return async dispatch => {
        dispatch(setNotification(`Anecdote '${anecdote}' was added`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, delay*1000)
    }
}

export default notificationSlice.reducer