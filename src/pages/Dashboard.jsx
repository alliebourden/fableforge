import React, { useState, useEffect, useRef } from "react";
import generateNPCchat from "../components/npcGeneratorChat";
import DiceRoller from "../components/DiceRoller";

export default function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatHistoryRef = useRef(null);

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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleGenerateNPC();
    }
  };

  const renderContent = (content) => {
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    if (typeof content === "object") {
      return (
        <div>
          {Object.entries(content).map(([key, value]) => (
            <div key={key}>
              {typeof value === "object" ? (
                <div>
                  <strong>{capitalizeFirstLetter(key)}:</strong>{" "}
                  {JSON.stringify(value)}
                </div>
              ) : key === "friendliness" ? (
                <div>
                  <strong>{capitalizeFirstLetter(key)}:</strong> {value}/10
                </div>
              ) : (
                <div>
                  <strong>{capitalizeFirstLetter(key)}:</strong> {value}
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

  useEffect(() => {
    chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
  }, [chatHistory]);

  return (
    <div>
      <div className="dashboard-content">
        <div className="chat-container">
          <div className="chat-container-top">
            <p>NPC Generator</p>
          </div>
          <div className="chat-history" ref={chatHistoryRef}>
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
            <input
              type="text"
              value={userInput}
              onChange={handleUserInput}
              onKeyPress={handleKeyPress}
              placeholder="What kind of NPC do you need?"
            />
            <button onClick={handleGenerateNPC} className="add-new-btn">
              Generate
            </button>
          </div>
        </div>
        <div className="dice-roller">
          <DiceRoller />
        </div>
      </div>
    </div>
  );
}
