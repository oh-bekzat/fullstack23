import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setNotification(`A new blog ${returnedBlog.title} ${returnedBlog.author} added`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      {!user &&
        <LoginForm 
          notification={notification}
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}            handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      }
      {user && 
        <div>
          <h2>Blogs</h2>
          <Notification message={notification} />
          <p>{user.name} logged in</p>
          <button onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
          }}>Log out</button>
          <Togglable buttonLabel="New note" ref={blogFormRef}>
            <BlogForm 
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              createBlog={addBlog}
              title={title}
              author={author}
              url={url}
            />
          </Togglable><br/>
          {blogs
            .map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App