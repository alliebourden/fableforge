import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SessionContext } from "./SessionContext";
import generateImage from "../components/ImageGeneration";

const ImageForm = () => {
  const { handleSubmit, register } = useForm();
  const { apiKey, setApiKey } = useContext(SessionContext);
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedImageURL, setGeneratedImageURL] = useState(null);
  const [promptText, setPromptText] = useState("");

  const onSubmit = async (data) => {
    const prompt = data.prompt;

    if (!apiKey) {
      setShowApiKeyPrompt(true);
      return;
    }

    try {
      setLoading(true);
      const imageResponse = await generateImage(apiKey, prompt);
      setGeneratedImageURL(imageResponse);
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

  const downloadImage = () => {
    if (generatedImageURL) {
      window.open(generatedImageURL, "_blank");
    }
  };

  useEffect(() => {
    const textarea = document.getElementById("prompt");
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [promptText]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="image-generation-form">
        <div className="image-generation-form-top">
          <p>IMAGE GENERATION</p>
        </div>
        <div className="image-generation-form-body">
          <label htmlFor="prompt">Enter your prompt:</label>
          <textarea
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
          <button onClick={handleApiKeySubmission}>Submit</button>
        </dialog>
      )}

      {generatedImageURL && (
        <dialog open className="generated-image-modal">
          <img
            className="generated-image"
            src={generatedImageURL}
            alt="Generated Image"
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
};

export default ImageForm;
