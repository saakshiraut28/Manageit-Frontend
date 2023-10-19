/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlertPrompt from "./components/AlertPrompt"
import Loading from "./components/Loading";

//      Components
import Demo from "./components/Demo"
// -----------------

// Types & interfaces

// ------------------

const router = createBrowserRouter([
  {
    path: "/",
    element: <Demo />,
  },
  {
    path: "/yo",
    element: <div className="h-full w-full bg-blue-500">Hello world!</div>,
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