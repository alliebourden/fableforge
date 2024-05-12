import React, { useState, useRef } from 'react';
import { Button, ThemeProvider } from "@mui/material";
import theme from "../Theme";
import ForgotPassword from './ForgotPassword';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const editorModal = useRef(null);

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await fetch('http://localhost:5001/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setMessage('Login successful');
      } catch (error) {
        setMessage('Invalid username or password');
      }
    };

    const openEditorModal = () => {
      editorModal.current.showModal();
    };

    const closeModal = () => {
      editorModal.current.close();
    };

    return (
        <ThemeProvider theme={theme}>
          <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <a href="#" onClick={openEditorModal}>
                  Forgot Password?
                </a>
                <dialog className="modal" ref={editorModal}>
                  <ForgotPassword closeModal={closeModal} />
                </dialog>
              </div>
              <Button variant='contained' type="submit">Login</Button>
            </form>
            <div>{message}</div>
          </div>
        </ThemeProvider>
      );
    }
    
    export default Login;
