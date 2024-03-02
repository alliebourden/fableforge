import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SessionContext } from "./SessionContext";
import generateMapImage from "./MapGeneration";

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
    <div className="image-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="image-generation-form">
        <div className="image-generation-form-top">
          <p>MAP GENERATION</p>
        </div>
        <div className="image-generation-form-body">
          {/* <label htmlFor="prompt">Enter your prompt:</label> */}
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
          <button
            type="submit"
            onKeyPress={handleKeyPress}
            className="image-generation-button-form"
          >
            SUBMIT
          </button>
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
          <button
            className="submit-api-button"
            onClick={handleApiKeySubmission}
          >
            Submit
          </button>
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
          <div>
            <button onClick={() => setGeneratedMapImageURL(null)}>Close</button>
            <button onClick={downloadMapImage}>Download</button>
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
};

export default ImageForm;
