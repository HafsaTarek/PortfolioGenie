import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import GitHubWorkflowManager from './pages/GitHubWorkflowManager/GitHubWorkflowManager';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/github-connect" element={<GitHubWorkflowManager />} />
      </Routes>
    </BrowserRouter>
  );
}