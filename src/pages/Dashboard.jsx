import React, { useState } from "react";
import generateNPCchat from "../components/npcGeneratorChat";

export default function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleGenerateNPC = async () => {
    const response = await generateNPCchat(userInput);
    setChatHistory([
      ...chatHistory,
      { role: "user", content: userInput },
      { role: "npc", content: response },
    ]);
    setUserInput("");
  };

  const renderContent = (content) => {
    if (typeof content === "object") {
      return (
        <div>
          {Object.entries(content).map(([key, value]) => (
            <div key={key}>
              {key === "friendliness" ? (
                <div>
                  <strong>{key}:</strong> {value}/10
                </div>
              ) : (
                <div>
                  <strong>{key}:</strong> {value}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    } else {
      return content;
    }
  };

  return (
    <div>
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              {renderContent(
                message.role === "npc"
                  ? JSON.parse(message.content)
                  : message.content
              )}
            </div>
          ))}
        </div>
        <div className="user-input">
          <input type="text" value={userInput} onChange={handleUserInput} />
          <button onClick={handleGenerateNPC} className="add-new-btn">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
