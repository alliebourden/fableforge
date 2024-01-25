import Logo from "../../assets/images/logo-small.png";
import { Outlet } from "react-router-dom";
import DashboardIcon from "../../assets/icons/DashboardIcon.svg";
import CampaignIcon from "../../assets/icons/CampaignIcon.svg";
import SessionIcon from "../../assets/icons/SessionListIcon.svg";
import QuestIcon from "../../assets/icons/QuestIcon.svg";
import LootIcon from "../../assets/icons/LootManagementIcon.svg";
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
            <div onClick={() => navigate("/")}>
              <p>Dashboard</p>
            </div>
            <div onClick={() => navigate("/campaign-summary")}>
              <p>Campaign Summary</p>
            </div>
            <div onClick={() => navigate("/session-list")}>
              <p>Session List</p>
            </div>
            <div onClick={() => navigate("/quest-tracker")}>
              <p>Quest Tracker</p>
            </div>
            <div onClick={() => navigate("/loot-manager")}>
              <p>Loot Manager</p>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
