import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const nav = useNavigate();
  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:8000/login', { username, password }, { withCredentials: true });
        if (response.data.success) {
          console.log('Logged in successfully');
            nav('/');
        } else {
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Login failed:', error.response?.data?.error);
      }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
