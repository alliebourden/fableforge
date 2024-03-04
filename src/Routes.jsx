import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import SessionEditor from "./components/SessionEditor";
import SessionList from "./components/SessionList";
import QuestTracker from "./components/QuestTracker";
import QuestTrackerForm from "./components/QuestTrackerForm";
import LootManager from "./components/LootManagerTable";
import CampaignSummary from "./components/CampaignSummary";

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
            <div>
              <CampaignSummary />
            </div>
          ),
        },
        {
          path: "/quest-tracker",
          element: (
            <div>
              <QuestTracker />
            </div>
          ),
        },
        {
          path: "/loot-manager",
          element: (
            <div>
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
            <div>
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
      ],
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/fableforge/" }
);

export default router;
