/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProjectDash from "./pages/ProjectDash";
import TaskPage from "./pages/TaskPage";
import UserProfile from "./pages/UserProfile";
import Messages from "./pages/Messages";
import ProjectList from "./pages/ProjectList";
import Calendar from "./pages/Calendar";
import OrgDashboard from "./pages/OrgDashboard";
import OrgUser from "./pages/OrgUser";

//      Components
import Demo from "./components/Demo";
import AlertPrompt from "./components/AlertPrompt";
import Loading from "./components/Loading";
import TaskCard from "./components/TaskCard";
import Chat from "./components/Chat";

const backend = import.meta.env.VITE_SERVER;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/project",
    element: <ProjectList />,
  },
  {
    path: "/card",
    element: <TaskCard />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "/project/:projectId",
    element: <ProjectDash />,
  },
  {
    path: "/task/:taskId",
    element: <TaskPage />,
  },
  {
    path: "/user/:userId",
    element: <UserProfile />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/chat/:name/:userId",
    element: <Chat />,
  },
  {
    path: "/org",
    element: <OrgDashboard />,
  },
  {
    path: "/orgUser",
    element: <OrgUser />,
  },
]);

const App = () => {
  const coldStart = async () => {
    await fetch(`${backend}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }


  useEffect(() => {
    coldStart();
  }, [])

  return (
    <div className="h-full w-full">
      <RouterProvider router={router} />
      <AlertPrompt />
      <Loading />
    </div>
  );
};

export default App;