import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  createNotification,
  wrongInitialsNotification,
} from './reducers/notificationReducer'
import { initializeBlogs, createBlog, removeBlog } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      // setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(wrongInitialsNotification())
    }
  }

  const deleteBlog = (blogId) => {
    dispatch(removeBlog(blogId))
  }

  return (
    <div>
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      )}
      {user && (
        <div>
          <h2>Blogs</h2>
          <Notification />
          <p>{user.name} logged in</p>
          <button
            id="logout-button"
            onClick={() => {
              window.localStorage.removeItem('loggedBlogappUser')
              dispatch(clearUser())
            }}
          >
            Log out
          </button>
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

export default App
