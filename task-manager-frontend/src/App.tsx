import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TeamPage from './components/Team/TeamPage';
import ProjectPage from './components/Project/ProjectPage';
import TaskPage from './components/Task/TaskPage';

const App: React.FC = () => {
  return (
    <Router>
      {/* Navbar - Soft Design */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold" style={{ fontSize: '24px', color: '#333' }} to="/">
            🧩 Task Manager
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <Link className="nav-link" style={{ color: '#555' }} to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{ color: '#555' }} to="/projects">Projects</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{ color: '#555' }} to="/tasks">Tasks</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <main className="container py-5">
        <Routes>
          <Route path="/teams" element={<TeamPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route
            path="*"
            element={
              <div className="text-center">
                <h1 style={{ fontSize: '2.8rem', fontWeight: 600, color: '#2c3e50' }}>
                  Welcome to Task Manager 👋
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>
                  Select a module above to get started.
                </p>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
                  alt="Organize Tasks"
                  width="120"
                  className="mt-3"
                />
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="text-center text-muted py-3" style={{ borderTop: '1px solid #e4e4e4' }}>
        <small>© {new Date().getFullYear()} Task Manager • Designed for simplicity</small>
      </footer>
    </Router>
  );
};

export default App;
