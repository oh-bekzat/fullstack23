import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { createNotification } from '../reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  removeBlog,
} from '../reducers/blogReducer'

const Blogs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogObject.user = { id: user.id, name: user.name, username: user.username }
    dispatch(createBlog(blogObject))
    dispatch(createNotification(blogObject))
  }

  const deleteBlog = (blogId) => {
    dispatch(removeBlog(blogId))
  }

  return (
    <div>
      {user && (
        <div>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <br />
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog._id}
              blog={blog}
              onRemove={deleteBlog}
              currentUser={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Blogs
