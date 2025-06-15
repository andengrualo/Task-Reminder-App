import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import logo from '../assets/TASKREMINDERS.png'; // Adjust this path to match your logo location

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email submitted:', email);
    
    // You can add your password reset logic here
    // For example, after successful email submission:
    // alert('Password reset link sent to your email!');
    // navigate('/login'); // Redirect back to login
  };
  
  const handleBackToLogin = () => {
    navigate('/login');
  };
  
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="logo-section">
          <img 
            src={logo} 
            alt="Task Reminder Logo" 
            className="logo-image-large"
          />
        </div>
        
        <div className="form-section">
          <div className="form-card">
            <h2 className="form-title">Forgot Password</h2>
            
            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="email-input"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <button type="submit" className="send-link-btn">
                Send Reset Link
              </button>
              
              <button 
                type="button" 
                onClick={handleBackToLogin}
                className="back-to-login-btn"
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;