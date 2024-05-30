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
        />
      </div>
      <div>
        Password
        <input
          type="text"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
    )
  }

  export default LoginForm