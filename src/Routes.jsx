import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import SessionEditor from "./components/SessionEditor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      {
        path: "session-editor",
        element: (
          <div>
            <SessionEditor />
          </div>
        ),
      },
    ],
  },
]);

export default router;
