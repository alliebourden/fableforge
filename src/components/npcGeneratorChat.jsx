import OpenAI from "openai";

async function generateNPCchat(userInput, apiKey) {
  try {
    if (!apiKey) {
      console.error("API key is missing");
      return null;
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    const response = await openai.chat.completions.create({
      messages: [
        {
          "role": "system",
          "content": [
            {
              "type": "text",
              "text": "You are an expert in creating diverse Non Playable Characters in Dungeons and Dragons 5th edition. You must create an NPC with the prompt from user. You must always respond in valid JSON only. An example response includes a name, a race, a profession, a description, a level of friendliness (out of 10) and a trait only. The object does not need a title. An example would be:\n\n{\n  \"Name\": \"Marigold Fizzbottle\",\n  \"Race\": \"Gnome\",\n  \"Profession\": \"Alchemist\",\n  \"Description\": \"Marigold Fizzbottle is a sprightly gnome with bright lemon hair and sapphire eyes. As a successful potion-seller, Marigold is known for her bubbly personality and love for creating colourful, artisan potions. Her sturdy little shop is packed with rows of neatly labelled potions and smells of a peculiar mix of herbs and magic. Despite her jovial demeanor, she’s serious when it comes to her creations.\",\n  \"Friendliness\": 8,\n  \"Trait\": \"Inquisitive\"\n}\n\n{\n  \"Crafting and Magical Professions\": [\n    \"Alchemist\",\n    \"Armorer\",\n    \"Carpenter\",\n    \"Jeweler\",\n    \"Leatherworker\",\n    \"Mason\",\n    \"Smith\",\n    \"Tailor\"\n  ],\n  \"Artistic and Performance Professions\": [\n    \"Actor\",\n    \"Artist\",\n    \"Bard\",\n    \"Dancer\",\n    \"Jester\",\n    \"Musician\",\n    \"Poet\",\n    \"Singer\"\n  ],\n  \"Academic and Intellectual Professions\": [\n    \"Archivist\",\n    \"Historian\",\n    \"Linguist\",\n    \"Mathematician\",\n    \"Philosopher\",\n    \"Scholar\",\n    \"Scientist\"\n  ],\n  \"Medical and Healing Professions\": [\n    \"Apothecary\",\n    \"Chirurgeon\",\n    \"Healer\",\n    \"Herbalist\",\n    \"Nurse\",\n    \"Veterinarian\"\n  ],\n  \"Merchant and Trade Professions\": [\n    \"Art Merchant\",\n    \"Banker\",\n    \"Farmer\",\n    \"Merchant\",\n    \"Sailor\",\n    \"Trader\"\n  ],\n  \"Military and Combat Professions\": [\n    \"Guard\",\n    \"Knight\",\n    \"Mercenary\",\n    \"Scout\",\n    \"Soldier\"\n  ],\n  \"Service and Labor Professions\": [\n    \"Cook\",\n    \"Laborer\",\n    \"Maid\",\n    \"Messenger\",\n    \"Servant\"\n  ],\n  \"Technical and Mechanical Professions\": [\n    \"Architect\",\n    \"Engineer\",\n    \"Mechanic\",\n    \"Surveyor\",\n    \"Tinker\"\n  ],\n  \"Miscellaneous Professions\": [\n    \"Bounty Hunter\",\n    \"Detective\",\n    \"Explorer\",\n    \"Fortune Teller\",\n    \"Gambler\",\n    \"Thief\"\n  ]\n}\n{\n  \"Races\": [\n    { \"Race\": \"Human\" },\n    { \"Race\": \"Elf\" },\n    { \"Race\": \"Dwarf\" },\n    { \"Race\": \"Halfling\" },\n    { \"Race\": \"Dragonborn\" },\n    { \"Race\": \"Gnome\" },\n    { \"Race\": \"Half-Elf\" },\n    { \"Race\": \"Half-Orc\" },\n    { \"Race\": \"Tiefling\" }\n  ]\n}\n"
            }
          ]
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      temperature: 1,
      max_tokens: 832,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: "gpt-4",
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating NPC:", error);
    return null;
  }
}

export default generateNPCchat;
