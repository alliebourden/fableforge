import OpenAI from "openai";

async function generateNPCimage(apiKey, npcDescriptions) {
  try {
    if (!apiKey) {
      console.error("API key is missing");
      return null;
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    const noText = ", photographic, scenic";
    const descriptionString = npcDescriptions.join(" ") + " " + noText;

    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt: descriptionString,
      size: "1024x1024",
    });

    return image.data[0]?.url || null;
  } catch (error) {
    console.error("Error generating NPC image", error);
    return null;
  }
}

export default generateNPCimage;
