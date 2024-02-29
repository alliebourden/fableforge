import React, { useState, useEffect, useContext } from "react";
import CampaignSummarizer from "./CampaignSummarizer";
import { SessionContext } from "./SessionContext";

export default function CampaignSummary() {
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(true);
  const { apiKey, setApiKey, sessions } = useContext(SessionContext);
  const [summaryResponse, setSummaryResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApiKeySubmission = async () => {
    if (!apiKey) {
      console.error("API key cannot be empty");
      return;
    }

    console.log("Current API Key:", apiKey);

    try {
      setLoading(true);
      const response = await CampaignSummarizer(sessions, apiKey);
      setSummaryResponse(response);
    } catch (error) {
      console.error("Error fetching campaign summary:", error);
    } finally {
      setLoading(false);
      setShowApiKeyPrompt(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!apiKey) {
      console.error("API key is missing");
      return;
    }

    try {
      setLoading(true);
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
          <pre>{JSON.stringify(summaryResponse, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
