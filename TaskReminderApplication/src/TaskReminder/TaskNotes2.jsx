import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskNotes2.css';

const TaskNotes = () => {
  const [notesData, setNotesData] = useState([]);
  const navigate = useNavigate();

  // Load notes from localStorage on component mount
  useEffect(() => {
    loadNotesFromStorage();
  }, []);

  const loadNotesFromStorage = () => {
    const savedNotes = JSON.parse(localStorage.getItem('taskNotes') || '[]');
    
    if (savedNotes.length === 0) {
      // Set default data if no saved notes exist
      const defaultNotesData = [
        {
          period: 'Previous 7 Days',
          tasks: [
            {
              id: 1,
              title: 'Revisions ADET Documentations',
              date: '06/10/2025',
              description: '*Gantt Chart, RTM, Business Requirements...',
              createdAt: new Date('2025-06-10').toISOString()
            }
          ]
        },
        {
          period: 'Previous 30 Days',
          tasks: [
            {
              id: 2,
              title: 'Revisions ADET Documentations',
              date: '05/18/2025',
              description: '*Gantt Chart, RTM, Business Requirements...',
              createdAt: new Date('2025-05-18').toISOString()
            }
          ]
        },
        {
          period: 'May',
          tasks: [
            {
              id: 3,
              title: 'Revisions ADET Documentations',
              date: '05/15/2025',
              description: '*Gantt Chart, RTM, Business Requirements...',
              createdAt: new Date('2025-05-15').toISOString()
            },
            {
              id: 4,
              title: 'Revisions ADET Documentations',
              date: '05/12/2025',
              description: '*Gantt Chart, RTM, Business Requirements...',
              createdAt: new Date('2025-05-12').toISOString()
            },
            {
              id: 5,
              title: 'Revisions ADET Documentations',
              date: '05/08/2025',
              description: '*Gantt Chart, RTM, Business Requirements...',
              createdAt: new Date('2025-05-08').toISOString()
            }
          ]
        }
      ];
      setNotesData(defaultNotesData);
    } else {
      // Group saved notes by period
      const groupedNotes = groupNotesByPeriod(savedNotes);
      setNotesData(groupedNotes);
    }
  };

  const groupNotesByPeriod = (notes) => {
    const now = new Date();
    const groups = {
      'Previous 7 Days': [],
      'Previous 30 Days': [],
      'May': [],
      'Older': []
    };

    notes.forEach(note => {
      const noteDate = new Date(note.createdAt);
      const diffTime = Math.abs(now - noteDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const formattedTask = {
        id: note.id,
        title: note.title,
        date: formatDate(note.createdAt),
        description: note.notes ? `*${note.notes.substring(0, 50)}...` : '*Gantt Chart, RTM, Business Requirements...',
        createdAt: note.createdAt
      };

      if (diffDays <= 7) {
        groups['Previous 7 Days'].push(formattedTask);
      } else if (diffDays <= 30) {
        groups['Previous 30 Days'].push(formattedTask);
      } else if (noteDate.getMonth() === 4) { // May is month 4 (0-indexed)
        groups['May'].push(formattedTask);
      } else {
        groups['Older'].push(formattedTask);
      }
    });

    // Convert to array format and filter out empty groups
    return Object.entries(groups)
      .filter(([period, tasks]) => tasks.length > 0)
      .map(([period, tasks]) => ({ period, tasks }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
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

  const handleBackToNotes = () => {
    // Navigate back to notes creation page
    navigate('/notes');
  };

  const handleCreateNewNote = () => {
    // Navigate to notes creation page
    navigate('/notes');
  };

  const handleTaskClick = (task) => {
    // Store selected task for editing and navigate to notes creation
    localStorage.setItem('editingNote', JSON.stringify({
      id: task.id,
      title: task.title,
      notes: task.description.replace('*', '').replace('...', ''),
      createdAt: task.createdAt
    }));
    navigate('/notes');
  };

  const handleDeleteTask = (taskId, sectionIndex, taskIndex) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      // Remove from localStorage
      const savedNotes = JSON.parse(localStorage.getItem('taskNotes') || '[]');
      const updatedNotes = savedNotes.filter(note => note.id !== taskId);
      localStorage.setItem('taskNotes', JSON.stringify(updatedNotes));
      
      // Update local state
      const updatedNotesData = [...notesData];
      updatedNotesData[sectionIndex].tasks.splice(taskIndex, 1);
      
      // Remove section if no tasks left
      if (updatedNotesData[sectionIndex].tasks.length === 0) {
        updatedNotesData.splice(sectionIndex, 1);
      }
      
      setNotesData(updatedNotesData);
    }
  };

  return (
    <div className="task-notes-container">
      {/* Header */}
      <div className="header">
        <div className="app-title">
          <div className="bell-icon">📝</div>
          <span>TaskReminder</span>
        </div>
        <div className="user-profile">
          <div className="notification-icon">🔔</div>
          <div className="avatar"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
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
        </div>

        {/* Content Area */}
        <div className="content-area">
          <div className="notes-header">
            <button className="back-btn" onClick={handleBackToNotes}>‹</button>
            <h2>Notes</h2>
            <button className="create-note-btn" onClick={handleCreateNewNote}>
              + Create New Note
            </button>
          </div>

          <div className="notes-content">
            {notesData.length === 0 ? (
              <div className="no-notes">
                <p>No notes found. Create your first note!</p>
                <button className="create-first-note-btn" onClick={handleCreateNewNote}>
                  Create Note
                </button>
              </div>
            ) : (
              notesData.map((section, sectionIndex) => (
                <div key={sectionIndex} className="notes-section">
                  <h3 className="period-title">{section.period}</h3>
                  {section.tasks.map((task, taskIndex) => (
                    <div key={task.id} className="task-card">
                      <div className="task-content" onClick={() => handleTaskClick(task)}>
                        <h4 className="task-title">{task.title}</h4>
                        <div className="task-meta">
                          <span className="task-date">{task.date}</span>
                          <span className="task-description">{task.description}</span>
                        </div>
                      </div>
                      <div className="task-actions">
                        <button 
                          className="edit-task-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskClick(task);
                          }}
                          title="Edit Note"
                        >
                          ✏️
                        </button>
                        <button 
                          className="delete-task-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTask(task.id, sectionIndex, taskIndex);
                          }}
                          title="Delete Note"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskNotes;