import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            state.push(action.payload)
        },
        voteAnecdote(state, action) {
            const id = action.payload.id
            const anecdoteToVote = state.find(n => n.id === id)
            if (anecdoteToVote) {
                anecdoteToVote.votes += 1
            }
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})
  
export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer