import React from "react";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { SessionContext } from "./SessionContext";
import generateImage from "../components/ImageGeneration";

const ImageForm = () => {
  const { handleSubmit, register } = useForm();
  const { apiKey, setApiKey } = useContext(SessionContext);
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);

  const onSubmit = async (data) => {
    const prompt = data.prompt;

    if (!apiKey) {
      setShowApiKeyPrompt(true);
      return;
    }

    await generateImage(apiKey, prompt);
  };

  const handleApiKeySubmission = () => {
    setApiKey(apiKey);
    setShowApiKeyPrompt(false);
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
    </div>
  );
};

export default ImageForm;
