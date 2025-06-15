import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import Dashboard from './TaskReminder/Dashboard';
import Login from './TaskReminder/Login';
import ForgotPassword from './TaskReminder/ForgotPassword';
import TaskCreation from './TaskReminder/TaskCreation';
import CompletedTask from './TaskReminder/CompletedTask';
import UpcomingTask from './TaskReminder/UpcomingTask';
import TaskNotes1 from './TaskReminder/TaskNotes1';
import TaskNotes2 from './TaskReminder/TaskNotes2';

// Import CSS files
import './Index.css';
import './TaskReminder/Dashboard.css';
import './TaskReminder/Login.css';
import './TaskReminder/ForgotPassword.css';
import './TaskReminder/TaskCreation.css';
import './TaskReminder/CompletedTask.css';
import './TaskReminder/UpcomingTask.css';
import './TaskReminder/TaskNotes1.css';
import './TaskReminder/TaskNotes2.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route - redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Main application routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Task management routes */}
          <Route path="/task-creation" element={<TaskCreation />} />
          <Route path="/create-task" element={<TaskCreation />} />
          
          {/* Task viewing routes */}
          <Route path="/completed-tasks" element={<CompletedTask />} />
          <Route path="/upcoming-tasks" element={<UpcomingTask />} />
          <Route path="/tasks/completed" element={<CompletedTask />} />
          <Route path="/tasks/upcoming" element={<UpcomingTask />} />
          
          {/* Notes routes */}
          <Route path="/Notes" element={<TaskNotes1 />} />
          <Route path="/Notes/add" element={<TaskNotes1 />} />
          <Route path="/Notes/create" element={<TaskNotes1 />} />
          <Route path="/Notes/new" element={<TaskNotes1 />} />
          <Route path="/Notes/edit/:id" element={<TaskNotes1 />} />
          <Route path="/Notes/view" element={<TaskNotes2 />} />
          <Route path="/Notes/list" element={<TaskNotes2 />} />
          <Route path="/Notes/1" element={<TaskNotes1 />} />
          <Route path="/Notes/2" element={<TaskNotes2 />} />
          <Route path="/Task-notes-1" element={<TaskNotes1 />} />
          <Route path="/Task-notes-2" element={<TaskNotes2 />} />
          
          {/* Alternative notes routing patterns */}
          <Route path="/add-note" element={<TaskNotes1 />} />
          <Route path="/create-note" element={<TaskNotes1 />} />
          <Route path="/new-note" element={<TaskNotes1 />} />
          
          {/* Catch all route - redirect to dashboard if authenticated, login if not */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;