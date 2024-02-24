import React, { useState, useEffect, useRef, useContext } from "react";
import generateNPCchat from "../components/npcGeneratorChat";
import DiceRoller from "../components/DiceRoller";
import { SessionContext } from "../components/SessionContext";
import NpcImageGeneration from "../components/NpcImageGeneration";
import ImageForm from "../components/ImageGenerationForm";

export default function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { apiKey, setApiKey } = useContext(SessionContext);
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const chatHistoryRef = useRef(null);
  const [npcDescriptions, setNpcDescriptions] = useState([]);
  const [npcGenerated, setNpcGenerated] = useState(false);
  const [generatedImageURL, setGeneratedImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateNPCchatbtn = useRef(null);

  const handleApiKeySubmission = () => {
    console.log("Current API Key:", apiKey);
    setApiKey(apiKey);
    console.log("API Key saved:", apiKey);
    setShowApiKeyPrompt(false);
    if (generateNPCchatbtn.current) {
      generateNPCchatbtn.current.click();
    }
  };

  const handleApiKeyInputChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleApiKeyInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleApiKeySubmission();
    }
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleGenerateNPC = async () => {
    if (!apiKey) {
      setShowApiKeyPrompt(true);
      return;
    }

    try {
      const response = await generateNPCchat(userInput, apiKey);

      const npcContent = JSON.parse(response);
      const npcDescription = JSON.stringify(npcContent.description);
      console.log(npcDescription);

      setNpcDescriptions([npcDescription]);

      setChatHistory([
        ...chatHistory,
        { role: "user", content: userInput },
        { role: "npc", content: response },
      ]);
      setUserInput("");
      setNpcGenerated(true);
    } catch (error) {
      console.error("Error generating NPC:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleGenerateNPC();
    }
  };

  const handleGenerateImage = async () => {
    try {
      setLoading(true);
      const imageResponse = await NpcImageGeneration(apiKey, npcDescriptions);
      console.log("Full Image Response:", imageResponse);

      if (imageResponse) {
        setGeneratedImageURL(imageResponse);
        console.log("Generated NPC Image:", imageResponse);
      } else {
        console.error("Error: Invalid response format", imageResponse);
      }
    } catch (error) {
      console.error("Error generating NPC image:", error);
    } finally {
      setLoading(false);
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
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
    console.log("Generated Image URL:", generatedImageURL);
  }, [chatHistory, generatedImageURL]);

  const downloadImage = () => {
    if (generatedImageURL) {
      const downloadLink = document.createElement("a");
      downloadLink.href = generatedImageURL;
      downloadLink.download = "generated_npc_image.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div>
      <div className="dashboard-content">
        <div className="dashboard-content-left">
          <div className="npc-generator-info">
            <p>
              Enter in the type of NPC you are looking for. The NPC Generator
              will produce an NPC based on your input, with a name, race,
              profession, description, frienliness scale and specific traits.
              Once you have an NPC you want to use, enhance your player
              experience by generating an NPC image based on the description
              value.
            </p>
          </div>
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
              <div>
                <button
                  onClick={handleGenerateNPC}
                  className="generate-npc-chat-button"
                  ref={generateNPCchatbtn}
                >
                  Generate NPC Details
                </button>
                {npcGenerated && (
                  <button
                    className="image-generation-button"
                    onClick={handleGenerateImage}
                  >
                    Generate NPC Image
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content-right">
          <div className="image-generation-form-info">
            <p>
              Use the image generator to help create your fantasy world maps or
              magic items. Enter your prompt below and see what you get!{" "}
              <strong>Tip:</strong>
              Try ending your prompt in TTRPG for the best results.
            </p>
          </div>
          <div className="image-form">
            <ImageForm />
          </div>
          <div className="dice-roller">
            <DiceRoller />
          </div>
        </div>
      </div>

      {showApiKeyPrompt && (
        <dialog open>
          <p>Please enter your OpenAI API key:</p>
          <input
            type="text"
            value={apiKey}
            onChange={handleApiKeyInputChange}
            onKeyPress={handleApiKeyInputKeyPress}
          />
          <button onClick={handleApiKeySubmission}>Submit</button>
        </dialog>
      )}
      {generatedImageURL && (
        <dialog open className="generated-image-modal">
          <img
            className="generated-image"
            src={generatedImageURL}
            alt="Generated NPC Image"
            style={{ width: "100%", height: "auto" }}
          />
          <div>
            <button onClick={() => setGeneratedImageURL(null)}>Close</button>
            <button onClick={downloadImage}>Download</button>
          </div>
        </dialog>
      )}
      {loading && (
        <dialog open className="loading-modal">
          <p>Generating Image...</p>
        </dialog>
      )}
    </div>
  );
}
