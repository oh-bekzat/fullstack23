import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        },
        updateAnecdote(state, action) {
            const { id, votes } = action.payload
            const anecdote = state.find((anecdote) => anecdote.id === id)
            if (anecdote) {
              anecdote.votes = votes
            }
        }
    }
})
  
export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteAnecdote = (anecdote) => {
    return async (dispatch) => {
        await anecdoteService.vote(anecdote)
        dispatch(updateAnecdote(anecdote))
    }
}

export default anecdoteSlice.reducer