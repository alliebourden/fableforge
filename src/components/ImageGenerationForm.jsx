import React from "react";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { SessionContext } from "./SessionContext";
import generateImage from "../components/ImageGeneration";

const ImageForm = () => {
  const { handleSubmit, register } = useForm();
  const { apiKey, setApiKey } = useContext(SessionContext);
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generatedImageURL, setGeneratedImageURL] = useState(null);

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

  const downloadImage = () => {
    if (generatedImageURL) {
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="image-generation-form">
        <div>
          <p>IMAGE GENERATION</p>
        </div>
        <div className="session-body">
          <label htmlFor="prompt">Enter prompt:</label>
          <input id="prompt" {...register("prompt", { required: true })} />
        </div>
        <div>
          <button type="submit">SUBMIT</button>
        </div>
      </form>

      {showApiKeyPrompt && (
        <dialog open>
          <p>Please enter your OpenAI API key:</p>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
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
