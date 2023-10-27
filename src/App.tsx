/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProjectDash from "./pages/ProjectDash";
import TaskPage from "./pages/TaskPage";
import UserProfile from "./pages/UserProfile";
import Messages from "./pages/Messages";
import ProjectList from "./pages/ProjectList";
import Calendar from "./pages/Calendar";
import OrgDashboard from "./pages/OrgDashboard";

//      Components
import Demo from "./components/Demo"
import AlertPrompt from "./components/AlertPrompt"
import Loading from "./components/Loading";
import TaskCard from "./components/TaskCard";
import Chat from "./components/Chat";
import OrgUser from "./pages/orgUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/project",
    element: <ProjectList />
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
    element: <UserProfile />
  },
  {
    path: "/messages",
    element: <Messages />
  },
  {
    path: "/calendar",
    element: <Calendar />
  },
  {
    path: "/chat/:name/:userId",
    element: <Chat />
  },
  {
    path: "/org",
    element: <OrgDashboard />
  },
  {
    path: "/orgUser",
    element: <OrgUser />
  }
]);

const App = () => {
  return (
    <div className="h-full w-full">
      <RouterProvider router={router} />
      <AlertPrompt />
      <Loading />
    </div>
  )
}

export default App;