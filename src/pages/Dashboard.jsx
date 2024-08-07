import React, { useState, useEffect, useRef, useContext } from "react";
import generateNPCchat from "../components/npcGeneratorChat";
import DiceRoller from "../components/DiceRoller";
import { SessionContext } from "../components/SessionContext";
import NpcImageGeneration from "../components/NpcImageGeneration";
import ImageForm from "../components/MapGenerationForm";
import NpcIcon from "../../assets/icons/NpcIcon.svg";
import { Button, ThemeProvider } from "@mui/material";
import theme from "../Theme";



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
      setLoading(true);
      const response = await generateNPCchat(userInput, apiKey);
      console.log("Response from API:", response);
  
      const npcContent = typeof response === 'string' ? JSON.parse(response) : response;
      console.log("Parsed NPC Content:", npcContent);
  
      const npcDescription = npcContent.Description;
  
      if (npcDescription) {
        setNpcDescriptions([npcDescription]);
        console.log("Generated NPC Description:", npcDescription);
      } else {
        console.warn("Description not found in the NPC content");
      }
      setChatHistory([
        ...chatHistory,
        { role: "user", content: userInput },
        { role: "npc", content: npcContent },
      ]);
      setUserInput("");
      setNpcGenerated(true);
    } catch (error) {
      console.error("Error generating NPC:", error);
    } finally {
      setLoading(false);
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

      if (imageResponse) {
        setGeneratedImageURL(imageResponse);
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
                  {key === "race" ? value.name : JSON.stringify(value)}
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
    const handleEscKey = (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        setShowApiKeyPrompt(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
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
    <ThemeProvider theme={theme}>
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-content-left">
          <div className="chat-container">
            <div className="chat-container-top">
              <img src={NpcIcon} height={20} />
              <p>NPC Generator</p>
            </div>
            <div className="chat-history" ref={chatHistoryRef}>
            {chatHistory.map((message, index) => (
            <div key={index} className={`chat-message ${message.role}`}>
              {renderContent(message.content)}
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
              <div className="chat-buttons">
                <Button variant="contained" color="primary"
                  onClick={handleGenerateNPC}
                  className="generate-npc-chat-button"
                  ref={generateNPCchatbtn}
                  sx={{ my: 1, mr: 1, }}
                >
                  GENERATE NPC
                </Button>
                {npcGenerated && (
                  <Button
                  variant="outlined"
                  color="primary"
                  className="generate-npc-image-btn"
                    onClick={handleGenerateImage}
                    sx={{ my: 1, ml: 1, }}
                  >
                    NPC IMAGE
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-content-right">
          <div className="image-form">
            <ImageForm />
          </div>
          <div className="dice-roller">
            <DiceRoller />
          </div>
        </div>
      </div>

      {showApiKeyPrompt && (
        <dialog open className="api-prompt">
          <p>
            To use our AI features, input your OpenAI API key once. Your
            key remains secure, granting access to FableForge's AI suite until
            you refresh your page.
          </p>
          <input
            type="text"
            value={apiKey}
            onChange={handleApiKeyInputChange}
            onKeyPress={handleApiKeyInputKeyPress}
          />
          <Button variant="contained" color="primary"
          sx={{ my: 1, }}
            className="submit-api-button"
            onClick={handleApiKeySubmission}
          >
            Submit
          </Button>
        </dialog>
      )}
      {generatedImageURL && (
        <dialog open className="generated-image-modal">
          <div>
            <img
              className="generated-image"
              src={generatedImageURL}
              alt="Generated NPC Image"
              style={{ width: "100%", height: "100%" }}
            />
            <div className="npc-image-modal-btns">
              <Button variant="contained" color="primary" onClick={() => setGeneratedImageURL(null)}
              sx={{ my: 1, mr: 1 }}>Close</Button>
              <Button 
              variant="outlined" 
              color="primary" 
              onClick={downloadImage}
              sx={{ my: 1, ml: 1 }}>Download</Button>
            </div>
          </div>
        </dialog>
      )}
      {loading && (
        <dialog open className="loading-modal">
          <h2>Loading</h2>
        </dialog>
      )}
    </div>
    </ThemeProvider>
  );
}
