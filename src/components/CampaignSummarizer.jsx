import OpenAI from "openai";

async function CampaignSummarizer(sessions, apiKey) {
  try {
    if (!apiKey) {
      console.error("API key is missing");
      return null;
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });
    // const userMessage = JSON.stringify(sessions);

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            'You are a expert in summarizing sessions from a Dungeons and Dragons 5th edition campaign. You will use campaign session data from an JSON object and summarize into an exciting fantasy story with multiple paragraphs. You must always respond with only the key of "summary" and the value is the story you create.\n\nI only want to see this kind of response -\n\n{\n    "summary": "You wake up to a mysterious scroll summoning you to Evelot\'s Vale, sparking curiosity and intrigue. Venturing to the Drunken Dog tavern, you meet various characters like the pale barkeep Roselin and get entangled in quests involving dire wolf pelts and a mining operation. Braving the Woods of the Sharp Teeth, you defeat dire wolves and delve into the mysteries of Evelot\'s Vale. As the plot thickens, Tyran seeks a fight club, Argus explores the citadel-turned-academy, and Bo confronts thieves in the bustling market. The essence of adventure and danger swirls around you as you navigate through this enigmatic settlement, uncovering secrets that may alter your fate."\n}\n',
        },
        {
          role: "assistant",
          content: sessions,
        },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
      temperature: 1,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating summary:", error);
    return null;
  }
}

export default CampaignSummarizer;
