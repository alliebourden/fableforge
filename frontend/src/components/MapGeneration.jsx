import OpenAI from "openai";

async function generateMapImage(apiKey, prompt) {
  try {
    if (!apiKey) {
      console.error("API key is missing");
      return null;
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });
    const promptArray = Array.isArray(prompt) ? prompt : [prompt];

    const addTTRPG = ", TTRPG";
    const promptString = promptArray.join(" ") + " " + addTTRPG;

    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: promptString,
      size: "1024x1024",
    });

    return image.data[0]?.url || null;
  } catch (error) {
    console.error("Error generating image", error);
    return null;
  }
}

export default generateMapImage;
