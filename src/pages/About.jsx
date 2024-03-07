import React from "react";
import SwordIcon from "../../assets/icons/sword.png";
import LinkedIn from "../../assets/icons/LinkedInIcon.svg";
import GitHub from "../../assets/icons/GitHubIcon.svg";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about-content">
      <h2>FableForge - The Dungeon Master Toolkit</h2>
      <br />
      <p>
        Welcome to FableForge, the essential toolkit for 5th edition Dungeon
        Masters. Organize sessions, quests, and loot effortlessly. Elevate your
        storytelling with AI tools for NPC creation, TTRPG maps, and session
        summaries.
      </p>
      <img src={SwordIcon} height={100} />
      <p>
        Concerned about security? We are too. For AI features, simply input your
        API key once. Your key remains secure, granting access to FableForge's
        AI suite until you refresh your page, ensuring a seamless, protected
        experience.
      </p>
      <img src={SwordIcon} height={100} />
      <p className="last-para">
        Discover the convenience of FableForge for crafting memorable adventures
        effortlessly. Whether you're a seasoned DM or new to the game, let
        FableForge assist you in creating enjoyable and unforgettable campaigns.
      </p>

      <div className="about-allie">
        <h3>Website designed by Allie Bourden</h3>
        <div className="about-icons">
          <Link
            to="https://github.com/alliebourden"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={GitHub} height={50} />
          </Link>
          <Link
            to="https://www.linkedin.com/in/alexandreabourden"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={LinkedIn} height={50} />
          </Link>
        </div>
      </div>
    </div>
  );
}
