import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/donor-service/donor-service/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("data:", data);
  
      if (data.success) {
        onLogin(data.userId);
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;