import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronUp, 
  Bell, 
  User, 
  ChevronRight, 
  X,
  Bot,
  Send,
  Paperclip,
  Minimize2,
  Maximize2,
  Home,
  Plus,
  Clock,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
import './Dashboard.css';
// Import the logo image from assets
import logoImage from '../assets/TASKREMINDER.png';
// Import profile image (you can replace this with actual user photo)
import profileImage from '../assets/profile-placeholder.jpg'; // Add this image to your assets

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hello! I'm your AI assistant. How can I help you with your tasks today?",
      timestamp: new Date()
    }
  ]);

  // User data (in a real app, this would come from context/state management)
  const [userData, setUserData] = useState({
    displayName: 'Andrea Lacusong',
    email: 'andrealacusong@gmail.com',
    password: '••••••••',
    profileImage: profileImage
  });

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Task Creation', path: '/task-creation', icon: Plus },
    { name: 'Upcoming Task', path: '/upcoming-tasks', icon: Clock },
    { name: 'Completed Task', path: '/completed-tasks', icon: CheckCircle },
    { name: 'AI Chatbot Assistant', path: '/ai-chatbot', action: 'chatbot', icon: MessageCircle }
  ];

  const handleNavigation = (path, item) => {
    if (item && item.action === 'chatbot') {
      setIsChatbotOpen(true);
      setIsMinimized(false);
    } else {
      navigate(path);
    }
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

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Add user message
      const userMessage = {
        id: chatHistory.length + 1,
        type: 'user',
        message: chatMessage,
        timestamp: new Date()
      };
      
      const updatedHistory = [...chatHistory, userMessage];
      setChatHistory(updatedHistory);
      setChatMessage('');

      // Simulate AI response after a short delay
      setTimeout(() => {
        const botResponse = {
          id: updatedHistory.length + 1,
          type: 'bot',
          message: generateBotResponse(chatMessage),
          timestamp: new Date()
        };
        setChatHistory(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const generateBotResponse = (userMessage) => {
    const responses = [
      "I can help you organize your tasks more efficiently. Would you like me to suggest some productivity tips?",
      "Based on your current progress, you're doing great! Keep up the momentum.",
      "I noticed you have some upcoming deadlines. Would you like me to help prioritize them?",
      "That's a great question! Let me help you break that down into manageable steps.",
      "I'm here to support your productivity goals. What specific area would you like to focus on?",
      "Your task completion rate is impressive! How can I help you maintain this pace?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
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
            <img 
              src={userData.profileImage} 
              alt="Profile" 
              className="profile-btn-image"
            />
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

      {/* AI Chatbot Widget */}
      {isChatbotOpen && (
        <div className={`chatbot-widget ${isMinimized ? 'minimized' : ''}`}>
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              <Bot size={20} className="chatbot-icon" />
              <span className="chatbot-title">AI Assistant</span>
            </div>
            <div className="chatbot-header-actions">
              <button onClick={toggleMinimize} className="chatbot-minimize-btn">
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button onClick={closeChatbot} className="chatbot-close-btn">
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="chatbot-messages">
                {chatHistory.map((msg) => (
                  <div key={msg.id} className={`message ${msg.type}`}>
                    <div className="message-content">
                      <p>{msg.message}</p>
                      <span className="message-time">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="chatbot-input">
                <div className="input-container">
                  <button className="attachment-btn">
                    <Paperclip size={18} />
                  </button>
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask AI chatbot assistant..."
                    className="chat-input"
                  />
                  <button onClick={handleSendMessage} className="send-btn">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <nav className="navigation">
            <ul className="nav-list">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path, item)}
                    className={`nav-button ${isActivePath(item.path) ? 'active' : ''} ${item.action === 'chatbot' ? 'chatbot-nav' : ''}`}
                  >
                    {/* Removed IconComponent */}
                    <span className="nav-text">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="page-content">
          <h1 className="page-title">Task Completion Report</h1>

          {/* Top Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card productive-day">
              <div className="stat-icon-wrapper">
                <ChevronUp className="stat-icon" size={24} />
              </div>
              <div className="stat-content">
                <h3 className="stat-title">Most Productive Day</h3>
                <p className="stat-description">Wednesday - 12 tasks completed</p>
              </div>
            </div>

            <div className="stat-card weekly-progress">
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
                      stroke="#8B4513"
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
      </div>
    </div>
  );
};

export default Dashboard;