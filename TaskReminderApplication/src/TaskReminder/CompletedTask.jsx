import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';
import './CompletedTask.css';
// Import the logo image from assets
import logoImage from '../assets/TASKREMINDER.png';

const CompletedTask = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    console.log('Profile clicked - navigate to login');
    navigate('/login');
  };

  // Check if current path is active
  const isActivePath = (path) => {
    return location.pathname === path;
  };
  
  const completedTasks = [
    {
      id: 1,
      name: 'Assignment 1',
      completedAt: '9:30 AM'
    },
    {
      id: 2,
      name: 'Activity 2',
      completedAt: '11:30 AM'
    },
    {
      id: 3,
      name: 'Project',
      completedAt: '1:15 PM'
    },
    {
      id: 4,
      name: 'Exam in Capstone',
      completedAt: '5:00 PM'
    }
  ];

  const overallTasks = [
    {
      id: 1,
      name: 'Capstone',
      description: 'Finalize Documentation\'s',
      dueDate: 'June 30, 2025',
      status: 'In Progress'
    },
    {
      id: 2,
      name: 'ADET',
      description: 'Finalize Documentation\'s',
      dueDate: 'June 30, 2025',
      status: 'In Progress'
    },
    {
      id: 3,
      name: 'ADET',
      description: 'Finalization of Prototype',
      dueDate: 'June 15, 2025',
      status: 'Done'
    }
  ];

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
              {/* Tab Navigation */}
              <div className="section-header">
                <h2 className="section-title">Completed Tasks</h2>
                <div className="tab-navigation">
                  <button className="tab-btn active">Today</button>
                  <button className="tab-btn">Week</button>
                  <button className="tab-btn">Month</button>
                  <button className="tab-btn">Report</button>
                </div>
              </div>

              <div className="content-grid">
                {/* Left Column */}
                <div className="left-column">
                  {/* Completed Today Summary */}
                  <div className="completed-summary">
                    <div className="progress-circle">
                      <div className="circle-progress">
                        <span className="progress-number">5</span>
                      </div>
                    </div>
                    <div className="summary-text">
                      <h3 className="summary-title">Completed Today</h3>
                      <p className="summary-subtitle">Great job! +2 from yesterday</p>
                    </div>
                  </div>

                  {/* Overall Section */}
                  <div className="overall-section">
                    <h3 className="overall-title">Overall</h3>
                    <div className="overall-tasks-list">
                      {overallTasks.map((task) => (
                        <div key={task.id} className="overall-task-item">
                          <div className="task-header">
                            <h4 className="overall-task-name">{task.name}</h4>
                            <button className="task-menu-btn">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="1"/>
                                <circle cx="19" cy="12" r="1"/>
                                <circle cx="5" cy="12" r="1"/>
                              </svg>
                            </button>
                          </div>
                          <p className="task-description">{task.description}</p>
                          <div className="task-footer">
                            <span className="task-due-date">Due: {task.dueDate}</span>
                            <span className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}>
                              {task.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="right-column">
                  {/* Today's Completed Tasks */}
                  <div className="tasks-section">
                    <h3 className="tasks-title">Today's Completed</h3>
                    <div className="tasks-list">
                      {completedTasks.map((task) => (
                        <div key={task.id} className="task-item">
                          <div className="task-check">
                            <div className="check-icon">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20,6 9,17 4,12"></polyline>
                              </svg>
                            </div>
                          </div>
                          <div className="task-content">
                            <h4 className="task-name">{task.name}</h4>
                            <p className="task-time">Completed at {task.completedAt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default CompletedTask;