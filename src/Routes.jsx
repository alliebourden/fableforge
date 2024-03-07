import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import SessionEditor from "./components/SessionEditor";
import SessionList from "./components/SessionList";
import QuestTracker from "./components/QuestTracker";
import QuestTrackerForm from "./components/QuestTrackerForm";
import LootManager from "./components/LootManagerTable";
import CampaignSummary from "./components/CampaignSummary";
import About from "./pages/About";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        {
          path: "campaign-summary",
          element: (
            <div className="campaign-summary">
              <CampaignSummary />
            </div>
          ),
        },
        {
          path: "/quest-tracker",
          element: (
            <div className="quest-tracker">
              <QuestTracker />
            </div>
          ),
        },
        {
          path: "/loot-manager",
          element: (
            <div className="loot-manager">
              <LootManager />
            </div>
          ),
        },
        {
          path: "/session-editor",
          element: (
            <div>
              <SessionEditor />
            </div>
          ),
        },
        {
          path: "/session-list",
          element: (
            <div className="sessions">
              <SessionList />
            </div>
          ),
        },
        {
          path: "/quest-tracker-form",
          element: (
            <div>
              <QuestTrackerForm />
            </div>
          ),
        },

        {
          path: "/about",
          element: (
            <div>
              <About />
            </div>
          ),
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/fableforge/" }
);

export default router;
