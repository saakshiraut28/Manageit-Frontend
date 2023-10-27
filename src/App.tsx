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

//      Components
import Demo from "./components/Demo"
import AlertPrompt from "./components/AlertPrompt"
import Loading from "./components/Loading";
import ProjectModal from "./components/ProjectModal";
import TaskModal from "./components/TaskModal";
import TaskCard from "./components/TaskCard";
import Chat from "./components/Chat";

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
    path: "/chat/:chatId",
    element: <Chat />
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