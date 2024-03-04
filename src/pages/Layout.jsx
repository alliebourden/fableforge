import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo-small.png";
import DashboardIcon from "../../assets/icons/DashboardIcon.svg";
import CampaignIcon from "../../assets/icons/CampaignIcon.svg";
import SessionIcon from "../../assets/icons/SessionListIcon.svg";
import QuestIcon from "../../assets/icons/QuestIcon.svg";
import LootIcon from "../../assets/icons/LootManagementIcon.svg";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  const handleNavigation = (path) => {
    setActivePage(path);
    navigate(path);
  };

  return (
    <div className="layout-wrapper">
      <div className="top-bar">
        <img src={Logo} height={80} className="top-logo" alt="Logo" />
      </div>
      <div className="sidebar">
        <p className="campaign-name">CAMPAIGN NAME</p>
        <div className="sidebar-content">
          <div className="icons">
            <img src={DashboardIcon} height={20} alt="Dashboard" />
            <img src={CampaignIcon} height={20} alt="Campaign" />
            <img src={SessionIcon} height={20} alt="Session" />
            <img src={QuestIcon} height={20} alt="Quest" />
            <img src={LootIcon} height={20} alt="Loot" />
          </div>
          <div className="sidebar-links">
            <div
              onClick={() => handleNavigation("/dashboard")}
              className={activePage === "/dashboard" ? "active" : ""}
            >
              <p>Dashboard</p>
            </div>
            <div
              onClick={() => handleNavigation("/campaign-summary")}
              className={activePage === "/campaign-summary" ? "active" : ""}
            >
              <p>Campaign Summary</p>
            </div>
            <div
              onClick={() => handleNavigation("/session-list")}
              className={activePage === "/session-list" ? "active" : ""}
            >
              <p>Session List</p>
            </div>
            <div
              onClick={() => handleNavigation("/quest-tracker")}
              className={activePage === "/quest-tracker" ? "active" : ""}
            >
              <p>Quest Tracker</p>
            </div>
            <div
              onClick={() => handleNavigation("/loot-manager")}
              className={activePage === "/loot-manager" ? "active" : ""}
            >
              <p>Loot Manager</p>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
