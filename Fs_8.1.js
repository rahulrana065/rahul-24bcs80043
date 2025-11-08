import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both Username and password');
    } else {
      setError('');
      // Log to console
      console.log('Username:', username);
      console.log('Password:', password);
      // Optionally clear the form after submit
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div style={{ width: '300px', margin: 'auto', paddingTop: '40px' }}>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
        )}
        <button type="submit" style={{ marginTop: '15px' }}>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
