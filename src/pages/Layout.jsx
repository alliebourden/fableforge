import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo-small.png";
import DashboardIcon from "../../assets/icons/DashboardIcon.svg";
import CampaignIcon from "../../assets/icons/CampaignIcon.svg";
import SessionIcon from "../../assets/icons/SessionListIcon.svg";
import QuestIcon from "../../assets/icons/QuestIcon.svg";
import LootIcon from "../../assets/icons/LootManagementIcon.svg";
import { useNavigate } from "react-router-dom";
import HamburgerIcon from "../../assets/icons/HamburgerIcon.svg";
import ScreenshotPhoto from "../../assets/images/screenshot.png";
import ManageCampaignsIcon from "../../assets/icons/ManageCampaignsIcon.svg";
import AiToolsIcon from "../../assets/icons/AiToolsIcon.svg";
import TrackLandingIcon from "../../assets/icons/TrackLandingIcon.svg";
import Headshot from "../../assets/images/Headshot.jpg";
import "animate.css";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);
  const [openMenu, setOpenMenu] = useState(window.innerWidth <= 800);

  const handleNavigation = (path) => {
    setActivePage(path);
    navigate(path);
    setOpenMenu(false);
  };

  const toggleMenu = () => {
    if (window.innerWidth <= 800) {
      setOpenMenu(!openMenu);
    } else {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setOpenMenu(window.innerWidth > 800);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startFableForge = () => {
    handleNavigation("/dashboard");
  };

  return (
    <div className="layout-wrapper">
      <div className="top-bar">
        <div className="top-bar-children">
          <img src={Logo} height={80} className="top-logo" alt="Logo" />
        </div>

        <div className="collapsed-bar">
          <img
            src={HamburgerIcon}
            height={20}
            alt="NavBarHamburger"
            className="hamburger-icon"
            onClick={toggleMenu}
          />
        </div>
        <div className="top-bar-children-2">
          <img src={Headshot} className="headshot" />
        </div>
      </div>
      {location.pathname !== "/" && (
        <div className={`sidebar ${openMenu ? "open" : ""}`}>
          <p className="campaign-tools">CAMPAIGN TOOLS</p>
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
      )}
      {location.pathname === "/" && (
        <div className="landing-page">
          <div className="hero">
            <img src={ScreenshotPhoto} alt="Screenshot on devices" />
            <div className="hero-header">
              <strong>
                <h1>Crafting Legends,</h1>
                <h1>Managing Myths</h1>
              </strong>
              <div className="try-button-container">
                <button className="try-button" onClick={startFableForge}>
                  START FABLEFORGE
                </button>
              </div>
            </div>
          </div>
          <div className="landing-info">
            <div className="landing-info-card">
              {" "}
              <img src={ManageCampaignsIcon} height={40} alt="Loot" />
              <p>
                Enhance your Dungeon Master experience with FableForge! Utilize
                intuitive tools for streamlined campaign organization.
              </p>
            </div>
            <div className="landing-info-card">
              <img src={AiToolsIcon} height={40} alt="Loot" />
              <p>
                Effortlessly craft dynamic NPCs, intricate maps, and insightful
                campaign summaries with FableForge's AI tools.
              </p>
            </div>
            <div className="landing-info-card">
              <img src={TrackLandingIcon} height={40} alt="Loot" />
              <p>
                Sort sessions, quests, and loot effortlessly, ensuring a
                structured adventure for both you and your players.
              </p>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}
