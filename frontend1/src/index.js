// index.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './login';
import PrivatePage from './profile';
import axios from 'axios';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:8000/private', { withCredentials: true });
        if (response.data.success) {
          // User is authenticated, allow access
        } else {
          // User is not logged in, redirect to login page
          navigate('/login');
        }
      } catch (error) {
        console.error('Failed to check if user is logged in:', error.response?.data?.error);
        // Redirect to login page in case of error
        navigate('/login');
      }
    };

    checkAuthentication();
  }, [navigate]);

  return <Element {...rest} />;
};

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/private" element={<PrivatePage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
