import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    appendComment(state, action) {
      return state.concat(action.payload)
    },
    setComments(state, action) {
      return action.payload
    },
  },
})

export const { appendComment, setComments } = commentSlice.actions

export const initializeComments = (blogId) => {
  return async (dispatch) => {
    const comments = await blogsService.getComments(blogId)
    console.log(comments)
    dispatch(setComments(comments))
  }
}

export const createComment = (comment, blogId) => {
  return async (dispatch) => {
    const newComment = await blogsService.comment({ comment }, blogId)
    dispatch(appendComment(newComment))
  }
}

export default commentSlice.reducer
