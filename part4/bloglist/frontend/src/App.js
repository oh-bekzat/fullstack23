import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Blogs from './components/Blogs'
import BlogViews from './components/BlogViews'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import { useState, useEffect } from 'react'
import { wrongInitialsNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const user = useSelector((state) => state.user)

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

  const navbar = {
    padding: 10,
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
  }

  const nav = {
    paddingLeft: 10,
    textDecoration: 'none',
    color: 'white',
    verticalAlign: 'middle',
    margin: 0,
  }

  return (
    <div>
      {!user ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      ) : (
        <div>
          <Router>
            <div style={navbar}>
              <Link style={nav} to="/">
                Blogs
              </Link>
              <Link style={nav} to="/users">
                Users
              </Link>
              <div style={nav}>{user.name} logged in</div>
              <div style={nav}>
                <button
                  id="logout-button"
                  onClick={() => {
                    window.localStorage.removeItem('loggedBlogappUser')
                    dispatch(clearUser())
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
            <Notification />
            <h2>Blog app</h2>
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<BlogViews />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
