function Login({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  role,
  setRole,
  error,
  handleAuth
}) {
  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Team Task Manager</h1>
        <p>Signup / Login to continue</p>

        {error && (
          <p className="error">{error}</p>
        )}

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option>Admin</option>
          <option>Member</option>
        </select>

        <div className="button-group">
          <button onClick={() => handleAuth("register")}>
            Register
          </button>

          <button onClick={() => handleAuth("login")}>
            Login
          </button>
      </div>
      </div>
    </div>
  );
}

export default Login;