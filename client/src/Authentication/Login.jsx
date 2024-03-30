import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from './features/auth/authSlice';

function Login() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(credentials));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={credentials.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={authStatus === 'loading'}>
        Sign In
      </button>
    </form>
  );
}

export default Login;
