import React, { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SessionContext } from "./SessionContext";
import AddSessionIcon from "../../assets/icons/AddSessionIcon.svg";
import CategoryTagIcon from "../../assets/icons/CategoryTagIcon.svg";
import theme from "../Theme";
import { Button, ThemeProvider } from "@mui/material";

const categoryStyle = {
  container: {
    minHeight: "150px",
    borderRadius: "10px",
    border: "3px solid #C2AC38",
    background: "#FFF",
    boxShadow: "5px 8px 10px 0px rgba(0, 0, 0, 0.10)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  titleContainer: {
    borderRadius: "10px 10px 0px 0px",
    borderTop: "3px solid #C2AC38",
    borderRight: "3px solid #C2AC38",
    borderLeft: "3px solid #C2AC38",
    background: "#132730",
    height: "45px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#FFF",
    fontStyle: "italic",
    padding: "8px 8px",
  },
};

const tags = [
  { value: "combatBoss", label: "Combat: Boss Fight" },
  { value: "combatRandomEncounter", label: "Combat: Random Encounter" },
  { value: "combatQuestRelated", label: "Combat: Quest Related" },
  { value: "storylinePlotTwist", label: "Storyline: Plot Twist" },
  {
    value: "storylineCharacterDevelopment",
    label: "Storyline: Character Development",
  },
  { value: "storylineLoreExpansion", label: "Storyline: Lore Expansion" },
  { value: "storylineForeshadowing", label: "Storyline: Foreshadowing" },
  { value: "locationsCity", label: "Locations: City" },
  { value: "locationsDungeon", label: "Locations: Dungeon" },
  { value: "locationsWilderness", label: "Locations: Wilderness" },
  { value: "locationsUnderwater", label: "Locations: Underwater" },
  { value: "roleplayNPCInteraction", label: "Roleplay: NPC Interaction" },
  { value: "roleplaySocialEncounter", label: "Roleplay: Social Encounter" },
  { value: "roleplayIntrigue", label: "Roleplay: Intrigue" },
  { value: "roleplayNegotiation", label: "Roleplay: Negotiation" },
  { value: "questsMainQuest", label: "Quests: Main Quest" },
  { value: "questsSideQuest", label: "Quests: Side Quest" },
  { value: "questsBountyHunt", label: "Quests: Bounty Hunt" },
  { value: "questsEscortMission", label: "Quests: Escort Mission" },
  { value: "themesHorror", label: "Themes: Horror" },
  { value: "themesMystery", label: "Themes: Mystery" },
  { value: "themesComedy", label: "Themes: Comedy" },
  { value: "themesRomance", label: "Themes: Romance" },
  { value: "challengesPuzzle", label: "Challenges: Puzzle" },
  { value: "challengesRiddle", label: "Challenges: Riddle" },
  { value: "challengesSkillChallenge", label: "Challenges: Skill Challenge" },
  { value: "challengesMoralDilemma", label: "Challenges: Moral Dilemma" },
  { value: "rewardsLoot", label: "Rewards: Loot" },
  { value: "rewardsMagicalItems", label: "Rewards: Magical Items" },
  { value: "timeTimeSensitive", label: "Time: Time-sensitive" },
  { value: "timeFlashback", label: "Time: Flashback" },
  { value: "timeTimeTravel", label: "Time: Time Travel" },
  { value: "trainingSkillTraining", label: "Training: Skill Training" },
  { value: "trainingNewAbilities", label: "Training: New Abilities" },
  { value: "trainingLevelingUp", label: "Training: Leveling Up" },
  {
    value: "memorableMomentsEpicMoment",
    label: "Memorable Moments: Epic Moment",
  },
  {
    value: "memorableMomentsCriticalHit",
    label: "Memorable Moments: Critical Hit",
  },
  {
    value: "memorableMomentsUnexpectedOutcome",
    label: "Memorable Moments: Unexpected Outcome",
  },
];

const SessionEditor = ({ closeModal }) => {
  const { sessions, handleAddSession } = useContext(SessionContext);
  const [selectedTags, setSelectedTags] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const handleChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const onSubmit = (data) => {
    const sessionData = {
      ...data,
      tags: selectedTags.map((tag) => tag.label),
    };
    handleAddSession(sessionData);
    console.log(sessionData);
    closeModal();
    reset();
  };

  return (
    <ThemeProvider theme={theme} >
    <div className="session-editor-content">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="session-form"
        method="dialog"
      >
        <div className="add-new-session">
          <img src={AddSessionIcon} height={20} />
          <p>Add New Session</p>
        </div>
        <div className="top-section">
          <div className="session-title">
            <label htmlFor="header">Session Title</label>
            <input
              type="text"
              id="header"
              {...register("header", { required: true })}
            />
          </div>
          <div>
          <label htmlFor="header" className="select-title">Select Tags</label>
          <Select
            options={tags}
            styles={{
              container: (provided) => ({
                ...provided,
                marginTop: "10px",
                marginBottom: "10px",
              }),
              control: (provided, state) => ({
                ...provided,
                width: "315px",
                minHeight: "25px",
                marginRight: "10px",
                marginLeft: "10px",
                borderRadius: "5px 5px 0px 0px",
                borderBottom: "1px solid #1E1E1E",
                background: "#D9D9D9",
                boxShadow: state.isFocused ? "0 0 0 2px #C2AC38" : "none",
              }),
              multiValueRemove: (provided) => ({
                ...provided,
                color: "#132730",
                backgroundColor: "#F0DFC8",
                ":hover": {
                  backgroundColor: "#C2AC38",
                  color: "#FFF",
                },
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: "#F0DFC8",
                color: "#132730",
                fontSize: "12px",
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                backgroundColor: "#132730",
              }),
              dropdownIndicator: (provided, state) => ({
                ...provided,
                color: state.isFocused ? "#C2AC38" : "#132730",
                ":hover": {
                  color: "#C2AC38",
                },
              }),
              clearIndicator: (provided, state) => ({
                ...provided,
                color: state.isFocused ? "#C2AC38" : "#132730",
                ":hover": {
                  color: "#C2AC38",
                },
              }),
              menu: (provided) => ({
                ...provided,
                fontSize: "12px",
              }),
              menuList: (provided) => ({
                ...provided,
                maxHeight: "150px",
              }),
            }}
            value={selectedTags}
            onChange={handleChange}
            isMulti
          />
          </div>
          <div className="session-date">
            <label htmlFor="date">Session Date</label>
            <input
              type="date"
              id="date"
              {...register("date", { required: true })}
            />
          </div>
          <div></div>
        </div>
        <div className="session-body">
          <label htmlFor="body">Session details</label>
          <textarea id="body" {...register("body", { required: true })} />
        </div>
        <div className="submit-btn">
          <Button
           variant="contained" color="primary"
           type="submit" 
          //  className="submit-new-session"
           >
            SUBMIT
          </Button>
          <Button
            variant="outlined" color="primary"
            type="button"
            // className="submit-new-session"
            onClick={closeModal}
          >
            CLOSE
          </Button>
        </div>
      </form>
    </div>
    </ThemeProvider>
  );
};

export default SessionEditor;
