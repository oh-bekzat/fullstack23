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
      const newBlog = action.payload
      return state.map((blog) => (blog._id === newBlog._id ? newBlog : blog))
    },
    deleteBlog(state, action) {
      const blogId = action.payload
      return state.filter((blog) => blog._id !== blogId)
    },
  },
})

export const { appendBlog, setBlogs, updateBlog, deleteBlog } =
  blogSlice.actions

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
    const newBlog = await blogsService.put({ ...blog, likes: blog.likes + 1 })
    dispatch(updateBlog(newBlog))
  }
}

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    await blogsService.dispose(blogId)
    dispatch(deleteBlog(blogId))
  }
}

export default blogSlice.reducer
