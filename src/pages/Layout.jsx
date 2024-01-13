import Logo from "./images/logo-small.png";
import { Outlet } from "react-router-dom";
import DashboardIcon from "./icons/Dashboard Icon.svg";
import CampaignIcon from "./icons/Campaign Icon.svg";
import SessionIcon from "./icons/Session List Icon.svg";
import QuestIcon from "./icons/Quest Icon.svg";
import LootIcon from "./icons/Loot Management Icon.svg";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <div className="layout-wrapper">
      <div className="top-bar">
        <img src={Logo} height={80} className="top-logo" />
      </div>
      <div className="sidebar">
        <p className="campaign-name">CAMPAIGN NAME</p>
        <div className="sidebar-content">
          <div className="icons">
            <img src={DashboardIcon} height={20} />
            <img src={CampaignIcon} height={20} />
            <img src={SessionIcon} height={20} />
            <img src={QuestIcon} height={20} />
            <img src={LootIcon} height={20} />
          </div>
          <div className="sidebar-links">
            <a>Dashboard</a>
            <a>Campaign Summary</a>
            <div onClick={() => navigate("/session-list")}>
              <p>Session List</p>
            </div>
            <a>Quest Tracker</a>
            <a>Loot Manager</a>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
