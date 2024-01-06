import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SessionForm from "./components/SessionForm";
import CategoryTags from "./components/CategoryTags";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      {
        path: "session-editor",
        element: (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <SessionForm />
            <CategoryTags />
          </div>
        ),
      },
    ],
  },
]);

export default router;
