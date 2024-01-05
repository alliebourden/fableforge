import React from "react";
import Select from "react-select";

const tags = [
  { value: "combat", label: "Combat" },
  { value: "shopping", label: "Shopping" },
  { value: "new quest", label: "New Quest" },
  { value: "roleplay", label: "Roleplay" },
  { value: "pc backstory", label: "PC Backstory" },
  { value: "npc", label: "NPC" },
];

const SessionTags = () => <Select options={tags} />;

export default SessionTags;
