import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronUp, Bell, User, ChevronRight, X } from 'lucide-react';
import './Dashboard.css';
// Import the logo image from assets
import logoImage from '../assets/TASKREMINDER.png';
// Import profile image (you can replace this with actual user photo)
import profileImage from '../assets/profile-placeholder.jpg'; // Add this image to your assets

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // User data (in a real app, this would come from context/state management)
  const [userData, setUserData] = useState({
    displayName: 'Andrea Lacusong',
    email: 'andrealacusong@gmail.com',
    password: '••••••••',
    profileImage: profileImage
  });

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Task Creation', path: '/task-creation' },
    { name: 'Upcoming Task', path: '/upcoming-tasks' },
    { name: 'Completed Task', path: '/completed-tasks' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileModalOpen(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setIsProfileModalOpen(false);
    navigate('/login');
  };

  const handleChangePhoto = () => {
    console.log('Change photo clicked');
    // Implement photo change functionality
  };

  const handleEditField = (field) => {
    console.log(`Edit ${field} clicked`);
    // Implement edit functionality for each field
  };

  // Check if current path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <img 
            src={logoImage} 
            alt="TaskReminder Logo" 
            className="header-logo-image"
          />
        </div>
        <div className="header-actions">
          <button className="notification-btn">
            <Bell size={20} />
          </button>
          <button onClick={handleProfileClick} className="profile-btn">
            <User size={20} />
          </button>
        </div>
      </header>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="profile-modal-overlay" onClick={handleCloseProfile}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <button className="profile-back-btn" onClick={handleCloseProfile}>
                <ChevronRight size={20} style={{ transform: 'rotate(180deg)' }} />
              </button>
              <h2 className="profile-modal-title">Edit Profile</h2>
            </div>

            <div className="profile-modal-content">
              <div className="profile-photo-section">
                <div className="profile-photo-container">
                  <img 
                    src={userData.profileImage} 
                    alt="Profile" 
                    className="profile-photo"
                  />
                </div>
                <button className="change-photo-btn" onClick={handleChangePhoto}>
                  Change Photo
                </button>
              </div>

              <div className="profile-fields">
                <div className="profile-field" onClick={() => handleEditField('displayName')}>
                  <div className="profile-field-content">
                    <label className="profile-field-label">Display Name:</label>
                    <span className="profile-field-value">{userData.displayName}</span>
                  </div>
                  <ChevronRight size={20} className="profile-field-arrow" />
                </div>

                <div className="profile-field" onClick={() => handleEditField('email')}>
                  <div className="profile-field-content">
                    <label className="profile-field-label">E-mail:</label>
                    <span className="profile-field-value">{userData.email}</span>
                  </div>
                  <ChevronRight size={20} className="profile-field-arrow" />
                </div>

                <div className="profile-field" onClick={() => handleEditField('password')}>
                  <div className="profile-field-content">
                    <label className="profile-field-label">Password:</label>
                    <span className="profile-field-value">{userData.password}</span>
                  </div>
                  <ChevronRight size={20} className="profile-field-arrow" />
                </div>
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <nav className="navigation">
            <ul className="nav-list">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`nav-button ${
                      isActivePath(item.path) ? 'active' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-wrapper">
          <main className="main-content">
            <div className="page-content">
              <h1 className="page-title">Task Completion Report</h1>

              {/* Top Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon-wrapper">
                    <ChevronUp className="stat-icon" size={24} />
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-title">Most Productive Day</h3>
                    <p className="stat-description">Wednesday - 12 tasks completed</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper">
                    <ChevronUp className="stat-icon" size={24} />
                  </div>
                  <div className="stat-content-progress">
                    <h3 className="stat-title">Weekly Progress</h3>
                    <div className="progress-badges">
                      <span className="progress-completed">13 Completed</span>
                      <span className="progress-remaining">2 Remaining</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Dashboard Section */}
              <div className="dashboard-main">
                <div className="dashboard-content">
                  {/* Completion Rate Circle */}
                  <div className="completion-section">
                    <div className="completion-circle">
                      <svg className="circle-svg" viewBox="0 0 200 200">
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#e5e5e5"
                          strokeWidth="12"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#4a3f35"
                          strokeWidth="12"
                          strokeDasharray={`${2 * Math.PI * 80 * 0.4} ${2 * Math.PI * 80}`}
                          strokeDashoffset={`${2 * Math.PI * 80 * 0.25}`}
                          className="progress-circle"
                        />
                      </svg>
                      <div className="completion-text">
                        <span className="completion-percentage">40%</span>
                      </div>
                    </div>
                    <p className="completion-label">Completion Rate</p>
                  </div>

                  {/* Weekly Stats */}
                  <div className="weekly-stats">
                    <h3 className="weekly-title">Weekly Stats</h3>
                    <div className="stats-list">
                      <div className="stat-row">
                        <span className="stat-label">Tasks Completed</span>
                        <span className="stat-value">29/39</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">On-time Completion</span>
                        <span className="stat-value">82%</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Avg. Completion Time</span>
                        <span className="stat-value">2.3h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance by Category */}
              <div className="performance-section">
                <h3 className="performance-title">Performance by Category</h3>
                <div className="category-list">
                  <div className="category-item">
                    <span className="category-name">School</span>
                    <div className="category-bar">
                      <div className="category-progress school-progress"></div>
                    </div>
                    <span className="category-percentage">75%</span>
                  </div>
                  <div className="category-item">
                    <span className="category-name">Personal</span>
                    <div className="category-bar">
                      <div className="category-progress personal-progress"></div>
                    </div>
                    <span className="category-percentage">60%</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;