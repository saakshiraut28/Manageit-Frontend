/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlertPrompt from "./components/AlertPrompt"
import Loading from "./components/Loading";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

//      Components
import Demo from "./components/Demo"
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
]);

const App = () => {
  return (
    <div className="h-full w-full">
      <RouterProvider router={router} />
      <AlertPrompt/>
      <Loading />
    </div>
  )
}

export default App