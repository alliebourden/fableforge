import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SessionContext } from "./SessionContext";
import generateMapImage from "./MapGeneration";
import MapIcon from "../../assets/icons/MapIcon.svg";
import theme from "../Theme";
import { Button, ThemeProvider } from "@mui/material";

const ImageForm = () => {
  const { handleSubmit, register } = useForm();
  const { apiKey, setApiKey } = useContext(SessionContext);
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedMapImageURL, setGeneratedMapImageURL] = useState(null);
  const [promptText, setPromptText] = useState("");

  const onSubmit = async (data) => {
    const prompt = data.prompt;

    if (!apiKey) {
      setShowApiKeyPrompt(true);
      return;
    }

    try {
      setLoading(true);
      const imageResponse = await generateMapImage(apiKey, prompt);
      setGeneratedMapImageURL(imageResponse);
    } catch (error) {
      console.error("Error generating image", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeySubmission = () => {
    setApiKey(apiKey);
    setShowApiKeyPrompt(false);
  };

  const handlePromptInputChange = (e) => {
    setPromptText(e.target.value);
  };

  const handleApiKeyInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApiKeySubmission();
      handleSubmit(onSubmit)();
    }
  };

  const handlePromptInputKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!apiKey) {
        setShowApiKeyPrompt(true);
      } else {
        handleSubmit(onSubmit)();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const downloadMapImage = () => {
    if (generatedMapImageURL) {
      window.open(generatedMapImageURL, "_blank");
    }
  };

  useEffect(() => {
    const textarea = document.getElementById("prompt");

    const handleEscKey = (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        setShowApiKeyPrompt(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [promptText]);

  return (
    <ThemeProvider theme={theme}>
    <div className="image-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="image-generation-form">
        <div className="image-generation-form-top">
          <img src={MapIcon} height={20} />
          <p>MAP GENERATION</p>
        </div>
        <div className="image-generation-form-body">
          <textarea
            placeholder="What kind of map do you need?"
            id="prompt"
            {...register("prompt", { required: true })}
            value={promptText}
            onChange={handlePromptInputChange}
            onKeyPress={handlePromptInputKeyPress}
          />
        </div>
        <div>
          <Button variant="contained" color="primary"
            type="submit"
            onKeyPress={handleKeyPress}
            className="image-generation-button-form"
            sx={{ my: 1, }}
          >
            SUBMIT
          </Button>
        </div>
      </form>

      {showApiKeyPrompt && (
        <dialog open>
          <p>Please enter your OpenAI API key:</p>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyPress={handleApiKeyInputKeyPress}
          />
          <Button
          variant="contained" color="primary"
            // className="submit-api-button"
            onClick={handleApiKeySubmission}
          >
            Submit
          </Button>
        </dialog>
      )}

      {generatedMapImageURL && (
        <dialog open className="generated-image-modal">
          <img
            className="generated-image"
            src={generatedMapImageURL}
            alt="Generated Map Image"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="generated-image-btn-container">
            <Button
            variant="contained" color="primary"
            sx={{ my: 1, mr: 1 }}
              // className="generate-npc-image-btn"
              onClick={() => setGeneratedMapImageURL(null)}
            >
              Close
            </Button>
            <Button
            variant="outlined" color="primary"
              // className="generate-npc-image-btn"
              onClick={downloadMapImage}
              sx={{ my: 1, ml: 1 }}
            >
              Download
            </Button>
          </div>
        </dialog>
      )}

      {loading && (
        <dialog open className="loading-modal">
          <p>Generating Image...</p>
        </dialog>
      )}
    </div>
    </ThemeProvider>
  );
};

export default ImageForm;
