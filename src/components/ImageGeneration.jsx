import OpenAI from "openai";

async function generateImage(apiKey, prompt) {
  try {
    if (!apiKey) {
      console.error("API key is missing");
      return null;
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      size: "1024x1024",
    });

    return image.data[0]?.url || null;
  } catch (error) {
    console.error("Error generating image", error);
    return null;
  }
}

export default generateImage;
