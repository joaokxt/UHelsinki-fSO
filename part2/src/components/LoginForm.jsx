const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
  }) => {
    return(
      <form onSubmit={handleSubmit} >
      <div>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          data-testid='username'
        />
      </div>
      <div>
        Password
        <input
          type="text"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          data-testid='password'
        />
      </div>
      <button type="submit" name="Login">Login</button>
    </form>
    )
  }

  export default LoginForm