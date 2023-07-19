import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      const newBlog = { ...action.payload }
      state.push(newBlog)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const { id, likes } = action.payload
      return state.map((blog) => (blog.id === id ? { ...blog, likes } : blog))
    },
  },
})

export const { appendBlog, setBlogs, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog)
    dispatch(appendBlog({ ...newBlog, user: blog.user }))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.put(blog)
    dispatch(updateBlog(blog))
  }
}

export default blogSlice.reducer
