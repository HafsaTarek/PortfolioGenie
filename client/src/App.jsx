import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import GitHubWorkflowManager from './pages/GitHubWorkflowManager/GitHubWorkflowManager';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Overview from './pages/Overview';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

function Layout() {
  return (
    <div className="App">
      <NavBar />
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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}