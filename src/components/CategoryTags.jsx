import React from "react";
import Select from "react-select";

const categoryStyle = {
  container: (provided) => ({
    ...provided,
    width: "425px",
    height: "250px",
    borderRadius: "10px",
    border: "3px solid #C2AC38",
    background: "#FFF",
    boxShadow: "5px 8px 10px 0px rgba(0, 0, 0, 0.10)",
  }),
};

const tags = [
  { value: "combat", label: "Combat" },
  { value: "shopping", label: "Shopping" },
  { value: "new quest", label: "New Quest" },
  { value: "roleplay", label: "Roleplay" },
  { value: "pc backstory", label: "PC Backstory" },
  { value: "npc", label: "NPC" },
];

const SessionTags = () => <Select options={tags} styles={categoryStyle} />;

export default SessionTags;
