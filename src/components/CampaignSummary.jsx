import React, { useState, useEffect, useContext, useRef } from "react";
import CampaignSummarizer from "./CampaignSummarizer";
import { SessionContext } from "./SessionContext";

export default function CampaignSummary() {
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(true);
  const { apiKey, setApiKey, sessions } = useContext(SessionContext);
  const [summaryResponse, setSummaryResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateSummarybtn = useRef(null);

  const handleApiKeySubmission = () => {
    console.log("Current API Key:", apiKey);
    setApiKey(apiKey);
    console.log("API Key saved:", apiKey);
    setShowApiKeyPrompt(false);
    if (generateSummarybtn.current) {
      generateSummarybtn.current.click();
    }
  };

  const handleGenerateSummary = async () => {
    if (!apiKey) {
      setShowApiKeyPrompt(true);
      return;
    }

    try {
      setLoading(true);
      console.log("Sessions:", sessions);
      const response = await CampaignSummarizer(sessions, apiKey);
      setSummaryResponse(response);
    } catch (error) {
      console.error("Error generating campaign summary:", error);
    } finally {
      setLoading(false);
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

  return (
    <div>
      {showApiKeyPrompt && (
        <dialog open className="api-prompt">
          <p>Please enter your OpenAI API key:</p>
          <input
            type="text"
            value={apiKey}
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
      <div className="campaign-summary-content">
        <h2>Campaign Summary</h2>
        <button onClick={handleGenerateSummary}>
          Generate Campaign Summary
        </button>
        {loading && <p>Loading...</p>}
        {summaryResponse && (
          <div>
            <p>{summaryResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}
