import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskNotes1.css';

const TaskNotes = () => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    if (title.trim() && notes.trim()) {
      // Get existing notes from localStorage or initialize empty array
      const existingNotes = JSON.parse(localStorage.getItem('taskNotes') || '[]');
      
      // Create new note object
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
        category: 'Recent' // You can modify this based on your needs
      };
      
      // Add new note to the beginning of the array
      const updatedNotes = [newNote, ...existingNotes];
      
      // Save to localStorage
      localStorage.setItem('taskNotes', JSON.stringify(updatedNotes));
      
      console.log('Note saved:', newNote);
      alert('Note saved successfully!');
      
      // Clear form after saving
      setTitle('');
      setNotes('');
    } else {
      alert('Please enter both title and notes before saving.');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setNotes('');
  };

  const handleViewNotes = () => {
    // Navigate to TaskNotes2 component
    navigate('/notes-view');
  };

  const handleNavigation = (route) => {
    switch(route) {
      case 'Dashboard':
        navigate('/dashboard');
        break;
      case 'Task Creation':
        navigate('/task-creation');
        break;
      case 'Notes':
        navigate('/notes');
        break;
      case 'Upcoming Task':
        navigate('/upcoming-tasks');
        break;
      case 'Completed Task':
        navigate('/completed-tasks');
        break;
      default:
        break;
    }
  };

  return (
    <div className="task-reminder-container">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">📝</span>
            <span className="logo-text">TaskReminder</span>
          </div>
        </div>
        <div className="header-right">
          <div className="notification-icon">🔔</div>
          <div className="profile-avatar">
            <img src="https://via.placeholder.com/32x32/8B4513/FFFFFF?text=U" alt="Profile" />
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="nav-menu">
            <div 
              className="nav-item" 
              onClick={() => handleNavigation('Dashboard')}
              style={{ cursor: 'pointer' }}
            >
              Dashboard
            </div>
            <div 
              className="nav-item" 
              onClick={() => handleNavigation('Task Creation')}
              style={{ cursor: 'pointer' }}
            >
              Task Creation
            </div>
            <div className="nav-item active">Notes</div>
            <div 
              className="nav-item" 
              onClick={() => handleNavigation('Upcoming Task')}
              style={{ cursor: 'pointer' }}
            >
              Upcoming Task
            </div>
            <div 
              className="nav-item" 
              onClick={() => handleNavigation('Completed Task')}
              style={{ cursor: 'pointer' }}
            >
              Completed Task
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <button className="edit-icon">✏️</button>
            <button className="view-notes-btn" onClick={handleViewNotes}>
              View Notes
            </button>
          </div>

          <div className="form-container">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                className="form-input"
                placeholder="Enter title notes here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes" className="form-label">Notes</label>
              <textarea
                id="notes"
                className="form-textarea"
                placeholder="Enter notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={10}
              />
            </div>

            <div className="form-actions">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaskNotes;