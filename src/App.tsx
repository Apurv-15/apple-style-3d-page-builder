import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BuilderPage from './features/builder/BuilderPage';
import DashboardPage from './features/dashboard/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/builder/:projectId" element={<BuilderPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;