import React from "react";

const SelectedQuestDetails = ({ quest }) => {
  return (
    <div className="quest-details">
      <h2>{quest.header}</h2>
      <p>{quest.body}</p>
    </div>
  );
};

export default SelectedQuestDetails;
