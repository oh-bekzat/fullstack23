import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  notification,
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => (
  <form onSubmit={handleLogin}>
    <h2>Log in to application</h2>
    <Notification message={notification} />
    <div>
        username: <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
        password: <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div><br />
    <button type="submit">log in</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm