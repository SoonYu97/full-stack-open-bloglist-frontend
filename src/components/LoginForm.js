import PropTypes from 'prop-types'

const LoginForm = ({ username, password, setUsername, setPassword, login }) => {
  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={login}>
        <div>
          <label>
            username:
            <input
              type='text'
              required
              id='username-input'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password:
            <input
              type='password'
              required
              id='password-input'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <div>
          <button id='login-button' type='submit'>login</button>
        </div>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

export default LoginForm
