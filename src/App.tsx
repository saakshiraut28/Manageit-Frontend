/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProjectDesc from "./pages/ProjectDesc";

//      Components
import Demo from "./components/Demo"
import AlertPrompt from "./components/AlertPrompt"
import Loading from "./components/Loading";

// -----------------

// Types & interfaces

// ------------------

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
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "/project/:projectId",
    element: <ProjectDesc />,
  },
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

export default App