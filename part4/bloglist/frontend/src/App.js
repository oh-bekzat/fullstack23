import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import Blogs from './components/Blogs'
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
  const users = useSelector((state) => state.users)

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
          <Router>
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User users={users} />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App
