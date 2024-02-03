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

  return (
    <div>
      <div className="npc-generator">
        <input type="text" value={userInput} onChange={handleUserInput} />
        <button onClick={handleGenerateNPC}>Generate NPC</button>
      </div>
      <div className="generated-npc">
        {chatHistory.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
}
