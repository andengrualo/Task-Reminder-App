import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, User, Edit, Trash2, X, ArrowLeft } from 'lucide-react';
import './UpcomingTask.css';
// Import the logo image from assets
import logoImage from '../assets/TASKREMINDER.png';

const UpcomingTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for modals and forms
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTaskInfoModalOpen, setIsTaskInfoModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    category: '',
    instructions: '',
    priority: ''
  });
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Task Creation', path: '/task-creation' },
    { name: 'Upcoming Task', path: '/upcoming-tasks' },
    { name: 'Completed Task', path: '/completed-tasks' }
  ];
  
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Reflection paper",
      dueDate: "June 2, 2025 Monday",
      dueTime: "11:59 pm",
      status: "To Do",
      category: "Academic",
      priority: "High",
      notes: "Literature review and analysis required",
      subject: "Applications Development and Emerging Technologies",
      instructions: "Presentation and Revision of Documentations Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      deadline: "June 17, 2025"
    },
    {
      id: 2,
      title: "Reflection paper",
      dueDate: "June 2, 2025 Monday",
      dueTime: "11:59 pm",
      status: "To Do",
      category: "Academic",
      priority: "Low",
      notes: "Literature review and analysis required",
      subject: "Applications Development and Emerging Technologies",
      instructions: "Presentation and Revision of Documentations Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      deadline: "June 17, 2025"
    },
    {
      id: 3,
      title: "Capstone Revision",
      dueDate: "June 3, 2025 Tuesday",
      dueTime: "11:59 pm",
      status: "In Progress",
      category: "Project",
      priority: "High",
      notes: "Address committee feedback",
      subject: "Capstone Project",
      instructions: "Implement all committee recommendations and prepare final presentation Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      deadline: "June 24, 2025"
    },
    {
      id: 4,
      title: "Capstone Revision",
      dueDate: "June 3, 2025 Tuesday",
      dueTime: "11:59 pm",
      status: "In Progress",
      category: "Project",
      priority: "High",
      notes: "Address committee feedback",
      subject: "Capstone Project",
      instructions: "Implement all committee recommendations and prepare final presentation Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      deadline: "June 24, 2025"
    },
    {
      id: 5,
      title: "Adet Prototype",
      dueDate: "June 4, 2025 Wednesday",
      dueTime: "11:59 pm",
      status: "Done",
      category: "Development",
      priority: "Low",
      notes: "Complete UI mockups",
      subject: "Applications Development and Emerging Technologies",
      instructions: "Create functional prototype with all required features Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      deadline: "June 26, 2025"
    }
  ]);

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

  // Handle task title click - show task information modal
  const handleTaskTitleClick = (task) => {
    setSelectedTask(task);
    setIsTaskInfoModalOpen(true);
  };

  // Handle edit button click
  const handleEditClick = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      date: task.dueDate.split(' ').slice(0, 3).join(' '), // Extract date part
      time: task.dueTime,
      category: task.category,
      instructions: task.instructions || task.notes || '',
      priority: task.priority
    });
    setIsEditModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form save
  const handleSave = () => {
    if (editingTask) {
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === editingTask.id 
            ? {
                ...task,
                title: formData.title,
                dueDate: formData.date,
                dueTime: formData.time,
                category: formData.category,
                instructions: formData.instructions,
                notes: formData.instructions,
                priority: formData.priority
              }
            : task
        )
      );
    }
    handleCloseEditModal();
  };

  // Handle edit modal close
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      category: '',
      instructions: '',
      priority: ''
    });
  };

  // Handle task info modal close
  const handleCloseTaskInfoModal = () => {
    setIsTaskInfoModalOpen(false);
    setSelectedTask(null);
  };

  // Handle delete task
  const handleDeleteClick = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
  };

  // Handle status change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus }
          : task
      )
    );
    
    // If status changed to "Done", optionally navigate to completed tasks
    if (newStatus === 'Done') {
      console.log('Task marked as completed');
    }
  };

  // Group tasks by status
  const groupedTasks = {
    'To Do': tasks.filter(task => task.status === 'To Do'),
    'In Progress': tasks.filter(task => task.status === 'In Progress'),
    'Done': tasks.filter(task => task.status === 'Done')
  };

  // Get priority class
  const getPriorityClass = (priority) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header - Copied from Dashboard.jsx */}
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
          {/* Navigation Menu */}
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
            {/* View Existing Reminder Button - Positioned in upper right */}
            <div className="main-header">
              <div className="header-spacer"></div>
              <button 
                className="view-existing-btn"
                style={{
                  backgroundColor: '#333',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  alignSelf: 'flex-start'
                }}
              >
                View Existing Reminder
              </button>
            </div>

            <div className="tasks-container-new">
              {Object.entries(groupedTasks).map(([status, statusTasks]) => (
                <div key={status} className="status-column">
                  <div className="status-header-new">
                    <h2 className="status-title-new">{status} ({statusTasks.length})</h2>
                  </div>
                  
                  <div className="status-tasks-new">
                    {statusTasks.map((task) => (
                      <div key={task.id} className="task-card-new">
                        <div className="task-header-new">
                          <h3 
                            className="task-title-new clickable"
                            onClick={() => handleTaskTitleClick(task)}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                handleTaskTitleClick(task);
                              }
                            }}
                          >
                            Task {task.id}: {task.title}
                          </h3>
                          
                          <div className="task-actions-new">
                            <button 
                              className="edit-btn-new"
                              onClick={() => handleEditClick(task)}
                              title="Edit task"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              className="delete-btn-new"
                              onClick={() => handleDeleteClick(task.id)}
                              title="Delete task"
                            >
                              <Trash2 size={14} />
                            </button>
                            <div className="status-dropdown-new">
                              <select 
                                className="status-select-new" 
                                value={task.status}
                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                title="Change status"
                              >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        <div className="task-details-new">
                          <p className="task-due-new">
                            <strong>Due:</strong> {task.dueDate}
                          </p>
                          <p className="task-time-new">
                            <strong>Time:</strong> {task.dueTime}
                          </p>
                          <div className="task-bottom-new">
                            <span className={`priority-tag-new ${getPriorityClass(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Task Information Modal */}
      {isTaskInfoModalOpen && selectedTask && (
        <div className="modal-overlay" onClick={handleCloseTaskInfoModal}>
          <div className="task-info-modal" onClick={(e) => e.stopPropagation()}>
            <div className="task-info-header">
              <button 
                className="back-btn"
                onClick={handleCloseTaskInfoModal}
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="task-info-title">Task Information</h2>
            </div>
            
            <div className="task-info-content">
              <div className="info-section">
                <label className="info-label">Subject</label>
                <div className="info-field">
                  {selectedTask.subject}
                </div>
              </div>

              <div className="info-section">
                <label className="info-label">Instructions</label>
                <div className="info-field instructions-field">
                  {selectedTask.instructions}
                </div>
              </div>

              <div className="info-section">
                <label className="info-label">Deadline</label>
                <div className="info-field">
                  {selectedTask.deadline}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={handleCloseEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button 
                className="back-btn modal-back-btn"
                onClick={handleCloseEditModal}
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="modal-title">Edit Task Reminder</h2>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter reminder title"
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <label className="form-label">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="Select date"
                    className="form-input"
                  />
                </div>

                <div className="form-group half-width">
                  <label className="form-label">Time</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="Select time"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select category</option>
                  <option value="Academic">Academic</option>
                  <option value="Project">Project</option>
                  <option value="Development">Development</option>
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Instructions</label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  placeholder="Add additional details..."
                  className="form-textarea"
                  rows="4"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="cancel-btn" 
                onClick={handleCloseEditModal}
              >
                Cancel
              </button>
              <button 
                className="save-btn" 
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingTask;