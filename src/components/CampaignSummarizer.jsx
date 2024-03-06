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

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert in summarizing sessions from a Dungeons and Dragons 5th edition campaign. You will use campaign session data from a JSON object and summarize it into an exciting fantasy story with multiple paragraphs. It should be a minimum of 1000 words.",
        },
        {
          role: "assistant",
          content: JSON.stringify(sessions),
        },
      ],
      model: "gpt-3.5-turbo-0125",
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