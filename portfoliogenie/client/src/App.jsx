import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import GitHubWorkflowManager from "./pages/GitHubWorkflowManager/GitHubWorkflowManager";
import Overview from "./pages/Overview/Overview";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import PortfolioPage from "./pages/PortfolioPage";
import ProfileSetting from "./pages/ProfileSetting/ProfileSetting";

// import { useState, useEffect } from "react";
// import { PortfolioService } from "./services/portfolio.service";

const aboutMeInitial = {};
const skillsInitial = [];
const projectsInitial = [];
const contentScore = 0;
const seoScore = 0;
const quickTips = [];

function Layout() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname === "/admin-dashboard";

  return (
    <div className="App">
      {!isAdminRoute && <NavBar />}

      <main className="main-content">
        <Outlet />
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },

      {
        path: "register",
        element: <Register />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "connect",
        element: <GitHubWorkflowManager />,
      },

      {
        path: "user-dashboard",
        element: <UserDashboard />,
      },

      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },

      // ===== Profile Settings Route =====
      {
        path: "profile",
        element: <ProfileSetting />,
      },

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
            onPreview={() =>
              console.log("Open portfolio preview")
            }
          />
        ),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}