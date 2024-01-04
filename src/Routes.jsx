import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SessionForm from "./components/SessionForm";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "session-editor", element: <SessionForm /> },
    ],
  },
]);

export default router;
