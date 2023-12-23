import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SessionEditor from "./pages/SessionEditor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/session-editor",
    element: <SessionEditor />,
  },
]);

export default router;
