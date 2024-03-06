import React, { useState, useEffect, useContext, useRef } from "react";
import CampaignSummarizer from "./CampaignSummarizer";
import { SessionContext } from "./SessionContext";
import CampaignIcon from "../../assets/icons/CampaignIcon.svg";

export default function CampaignSummary() {
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const {
    apiKey: contextApiKey,
    setApiKey: setContextApiKey,
    sessions,
  } = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState(null);

  const generateSummarybtn = useRef(null);

  useEffect(() => {
    const storedSummary = sessionStorage.getItem("generatedSummary");
    if (storedSummary) {
      setGeneratedSummary(storedSummary);
    }

    window.addEventListener("beforeunload", () => {
      sessionStorage.removeItem("generatedSummary");
    });
    window.removeEventListener("beforeunload", () => {
      sessionStorage.removeItem("generatedSummary");
    });
  }, []);

  const handleApiKeySubmission = () => {
    console.log("Current API Key:", contextApiKey);
    localStorage.setItem("apiKey", contextApiKey);
    console.log("API Key saved:", contextApiKey);
    setShowApiKeyPrompt(false);
    if (generateSummarybtn.current) {
      generateSummarybtn.current.click();
    }
  };

  const handleGenerateSummary = async () => {
    if (!contextApiKey) {
      setShowApiKeyPrompt(true);
      return;
    }

    if (sessions.length === 0) {
      alert(
        "No session data available. Please add sessions before generating a summary."
      );
      return;
    }

    try {
      setLoading(true);
      const response = await CampaignSummarizer(sessions, contextApiKey);
      setGeneratedSummary(response);
      sessionStorage.setItem("generatedSummary", response);
    } catch (error) {
      console.error("Error generating campaign summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeyInputChange = (e) => {
    setContextApiKey(e.target.value);
  };

  const handleApiKeyInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleApiKeySubmission();
    }
  };

  return (
    <div className="campaign-container">
      <div className="campaign-summary-content">
        <div className="campaign-summary-top">
          <img src={CampaignIcon} height={20} />
          <p>Campaign Summary</p>
        </div>
        <div className="campaign-summary-main">
          <div className="campaign-summary-generation-container">
            {generatedSummary && (
              <div className="campaign-summary-generation">
                {loading && <p>Loading...</p>}
                <p>{generatedSummary}</p>
              </div>
            )}
          </div>
          <div className="campaign-summary-btn-container">
            <button onClick={handleGenerateSummary}>
              Generate Campaign Summary
            </button>
          </div>
        </div>
      </div>
      {showApiKeyPrompt && (
        <dialog open className="api-prompt">
          <p>Please enter your OpenAI API key:</p>
          <input
            type="text"
            value={contextApiKey}
            onChange={handleApiKeyInputChange}
            onKeyPress={handleApiKeyInputKeyPress}
          />
          <button
            className="submit-api-button"
            onClick={handleApiKeySubmission}
          >
            Submit
          </button>
        </dialog>
      )}
    </div>
  );
}
