import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, User, Plus, Save } from 'lucide-react';
import './TaskCreation.css';
// Import the logo image from assets
import logoImage from '../assets/TASKREMINDER.png';
// Import the task creation image from assets
import taskCreationImage from '../assets/TASKCREATION.png';

const TaskCreation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    dueTime: ''
  });

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Task Creation', path: '/task-creation' },
    { name: 'Upcoming Task', path: '/upcoming-tasks' },
    { name: 'Completed Task', path: '/completed-tasks' }
  ];

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', dueTime: '' });
      setShowTaskForm(false);
    }
  };

  // New function to handle quick save with due time
  const handleQuickSave = () => {
    // Check if we have at least a title or due time to save
    if (newTask.title.trim() || newTask.dueTime) {
      const taskToSave = {
        ...newTask,
        id: Date.now(),
        completed: false,
        // If no title is provided, create a default one based on due time
        title: newTask.title.trim() || `Task due at ${newTask.dueTime || 'unspecified time'}`
      };
      
      setTasks([...tasks, taskToSave]);
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', dueTime: '' });
      setShowTaskForm(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

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
              {tasks.length === 0 && !showTaskForm ? (
                <div className="empty-state">
                  <div className="illustration">
                    <img 
                      src={taskCreationImage} 
                      alt="Task Creation Illustration" 
                      className="task-creation-image"
                    />
                  </div>
                  <p className="empty-message">Add your Task first..</p>
                  
                  {/* Add Task Button positioned in top-right */}
                  <button
                    onClick={() => setShowTaskForm(true)}
                    className="add-task-btn-top-right"
                  >
                    Add Task
                  </button>
                </div>
              ) : (
                <div className="tasks-container">
                  <div className="tasks-header">
                    <h2 className="tasks-title">Your Tasks</h2>
                    <div className="tasks-header-right">
                      <span className="task-count">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
                      <button
                        onClick={() => setShowTaskForm(true)}
                        className="add-task-btn-header"
                      >
                        Add Task
                      </button>
                    </div>
                  </div>
                  
                  <div className="tasks-list">
                    {tasks.map(task => (
                      <div key={task.id} className={`task-card-new ${task.completed ? 'completed' : ''}`}>
                        <div className="task-card-content-new">
                          <div className="task-main-content">
                            <div className="task-checkbox-wrapper">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                                className="task-checkbox-new"
                              />
                            </div>
                            <div className="task-details">
                              <h3 className="task-title-new">{task.title}</h3>
                              {task.description && (
                                <p className="task-description-new">{task.description}</p>
                              )}
                              <div className="task-meta">
                                <span className={`priority-badge-new priority-${task.priority}`}>
                                  {task.priority.toUpperCase()}
                                </span>
                                {task.dueDate && (
                                  <span className="due-date-new">
                                    Due: {task.dueDate} {task.dueTime && `at ${task.dueTime}`}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="delete-btn-new"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Task Form Modal */}
              {showTaskForm && (
                <div className="modal-overlay">
                  <div className="task-form-modal task-form-modal-wide">
                    <div className="modal-header">
                      <h3>Add New Task</h3>
                      <button
                        onClick={() => setShowTaskForm(false)}
                        className="close-btn"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="form-content">
                      <div className="form-group">
                        <label>Task Subject</label>
                        <input
                          type="text"
                          value={newTask.title}
                          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                          placeholder="Enter task subject..."
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Instructions</label>
                        <textarea
                          value={newTask.description}
                          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                          placeholder="Enter task instructions..."
                          className="form-textarea"
                          rows="3"
                        />
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label>Priority</label>
                          <select
                            value={newTask.priority}
                            onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                            className="form-select"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                        
                        <div className="form-group">
                          <label>Due Date</label>
                          <input
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                            className="form-input"
                          />
                        </div>
                        
                        <div className="form-group due-time-group">
                          <label>Due Time</label>
                          <div className="due-time-container">
                            <input
                              type="time"
                              value={newTask.dueTime}
                              onChange={(e) => setNewTask({...newTask, dueTime: e.target.value})}
                              className="form-input due-time-input"
                            />
                            <button
                              onClick={handleQuickSave}
                              className="save-btn"
                              title="Quick save with current time"
                              disabled={!newTask.dueTime && !newTask.title.trim()}
                            >
                              <Save size={16} />
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="form-actions">
                        <button
                          onClick={() => setShowTaskForm(false)}
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddTask}
                          className="btn btn-primary"
                          disabled={!newTask.title.trim()}
                        >
                          Add Task
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TaskCreation;