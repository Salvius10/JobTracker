import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashBoard from './pages/DashBoard'; // Your main job listing page

// Optional: 404 Not Found page
const NotFound = () => <h2>404 - Page Not Found</h2>;

function App() {
  const isAuthenticated = !!localStorage.getItem("access"); // basic check

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected route placeholder */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <DashBoard /> : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
