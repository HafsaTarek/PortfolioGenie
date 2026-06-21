import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import GitHubWorkflowManager from './pages/GitHubWorkflowManager/GitHubWorkflowManager';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Overview from './pages/Overview/Overview';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import PortfolioPage from './pages/PortfolioPage';

import {
  aboutMeInitial,
  skillsInitial,
  projectsInitial,
  contentScore,
  seoScore,
  quickTips
} from './data/mockData'; 

function Layout() {
  const location = useLocation();
  
  const isAdminRoute = location.pathname === '/admin-dashboard';

  return (
    <div className="App">
      {!isAdminRoute && <NavBar />}
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Overview /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "connect", element: <GitHubWorkflowManager /> },
      { path: "user-dashboard", element: <UserDashboard /> },
      { path: "admin-dashboard", element: <AdminDashboard /> },
      { 
        path: "portfolio", 
        element: (
          <PortfolioPage 
            aboutMe={aboutMeInitial}
            skills={skillsInitial}
            projects={projectsInitial}
            contentScore={contentScore}
            seoScore={seoScore}
            quickTips={quickTips}
            onPreview={() => console.log('Open portfolio preview')}
          />
        ) 
      }, 
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}