import Notification from './Notification'

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

  export default LoginForm