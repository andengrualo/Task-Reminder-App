import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import components
import Dashboard from './TaskReminder/Dashboard';
import Login from './TaskReminder/Login';
import ForgotPassword from './TaskReminder/ForgotPassword';
import TaskCreation from './TaskReminder/TaskCreation';
import CompletedTask from './TaskReminder/CompletedTask';
import UpcomingTask from './TaskReminder/UpcomingTask';

// Import CSS files
import './Index.css';
import './TaskReminder/Dashboard.css';
import './TaskReminder/Login.css';
import './TaskReminder/ForgotPassword.css';
import './TaskReminder/TaskCreation.css';
import './TaskReminder/CompletedTask.css';
import './TaskReminder/UpcomingTask.css';

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

          {/* Catch all route - redirect to dashboard if authenticated, login if not */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;