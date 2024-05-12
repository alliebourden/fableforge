import React, { useState } from 'react';
import { Button, ThemeProvider } from "@mui/material";
import theme from "../Theme";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const Submit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/api/user/forgot-password', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email })
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            setMessage('Password reset email sent successfully');
          } catch (error) {
            setMessage('Error sending password reset email');
          }
        };

        return (
            <div>
              <h2>Forgot Password</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  variant='contained'
                  type="submit">Reset Password</Button>
              </form>
              <div>{message}</div>
            </div>
          );
        }

export default ForgotPassword;

