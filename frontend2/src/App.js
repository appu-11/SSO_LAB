// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const nav = useNavigate();
  const [state, setState] = useState(0);

  const handleprivate = async () => {
    try {
      const response = await axios.get('http://localhost:8000/private', { withCredentials: true });
      if (response.data.success) {
        setState(1);
        nav('/private');
      } else {
        setState(0);
        alert("not logged in");
        nav('/login');
      }
    } catch (error) {
      console.error('Failed to check if user is logged in:', error.response?.data?.error);
      alert("not logged in");
      nav('/login');
    }
  };

  const handlelogout = async () => {
    try {
      await axios.post('http://localhost:8000/logout', null, { withCredentials: true });
      setState(0);
    } catch (error) {
      console.error('Failed to logout:', error.response?.data?.error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8000/private', { withCredentials: true })
      .then((response) => {
        if (response.data.success) {
          setState(1);
        } else {
          setState(0);
        }
      })
      .catch((error) => {
        console.error('Failed to check if user is logged in:', error.response?.data?.error);
        setState(0);
      });
  }, []);

  return (
    <div className='temp'>
      <h1>Hello Frontend 2</h1>
      <button className="button" onClick={handleprivate}>Private</button>
      {state === 1 && <button className="button logout-button" onClick={handlelogout}>Logout</button>}
    </div>
  );
}

export default App;
