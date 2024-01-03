import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SessionEditor from "./pages/SessionEditor";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "session-editor", element: <SessionEditor /> },
    ],
  },
]);

export default router;
