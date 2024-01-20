import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import SessionEditor from "./components/SessionEditor";
import SessionList from "./components/SessionList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/campaign-summary", element: <div></div> },
      { path: "/quest-tracker", element: <div></div> },
      { path: "/loot-manager", element: <div></div> },
      {
        path: "session-editor",
        element: (
          <div>
            <SessionEditor />
          </div>
        ),
      },
      {
        path: "session-list",
        element: (
          <div>
            <SessionList />
          </div>
        ),
      },
    ],
  },
]);

export default router;
