import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import taskCreationImage from '../assets/TASKREMINDERS.png';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '' // Added for registration
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'login') {
        console.log('Login attempt:', formData);
        
        // Simulate login API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, accept any email/password
        // In real app, validate credentials with your backend
        if (formData.email && formData.password) {
          // Navigate to dashboard
          navigate('/dashboard', { replace: true });
        } else {
          setError('Please enter valid credentials');
        }
      } else {
        console.log('Register attempt:', formData);
        
        // Basic validation for registration
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        
        // Simulate registration API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Navigate to dashboard after successful registration
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="logo-section">
          <img src={taskCreationImage} alt="Task Creation Illustration" className="logo-image-large" />
        </div>

        <div className="form-section">
          <div className="form-card">
            <h2 className="form-title">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            
            <div className="tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => handleTabChange('login')}
                disabled={loading}
              >
                Login
              </button>
              <button 
                className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => handleTabChange('register')}
                disabled={loading}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  disabled={loading}
                  minLength={activeTab === 'register' ? 6 : undefined}
                />
              </div>

              {activeTab === 'register' && (
                <div className="input-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span className="loading-spinner">
                    Loading...
                  </span>
                ) : (
                  activeTab === 'login' ? 'Login' : 'Create Account'
                )}
              </button>

              {activeTab === 'login' && (
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              )}
            </form>

            <div className="navigation-links">
              <Link to="/about" className="nav-link">About Us</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;