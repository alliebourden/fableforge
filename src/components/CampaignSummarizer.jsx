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

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            'You are a expert in summarizing sessions from a Dungeons and Dragons 5th edition campaign. Take the campaign session data from an individual session and summarize into key points. Max summarization should be 3 paragraphs.\n\nThis is the campaign session data -\n\n{\n    "header": "Session 2",\n    "date": "2024-02-23",\n    "body": "Under the veil of invisibility, the group, joined by Reya Mantlemorn, sneaks into the Vanthampur Villa. You climb to the roof of the stable house located on the north west side of the property. The noise draws out the stable master who alerts a group of three patrolling guards walking east along the northern path. They determine no suspicious activity and continue their patrol clockwise around the property.\\n\\nYou travel down the west wall and approaching the front entrance you see a second floor balcony; the ideal access point. Still under the effects of your potion of invisibility you all climb to the second floor balcony. Climbing to the roof, you can see into the third floor tower. Through the window, you see two padlocked cages with human prisoners inside.\\n\\nThe light from the hallway inside shines under the door leading to the balcony. Changes in the light indicated there are people in the hallway inside, walking by the door periodically. Listening carefully you can hear muffled conversation coming from inside the villa.\\n\\nTo investigate the prisoners in the tower, you enter the Duke’s study and travel up the spiral iron staircase undetected due to invisibility. You enter the tower peak, and question the two prisoners:\\n\\nShaleen Zoraz (human commoner), a sewer maintenance supervisor who was looking to extend some of the sewer system into the area occupied by the Dungeon of the Dead Three (under the bathhouse). The Duke is holding her and planning to free her in a few days. The imps have terrorised Shaleen so much that she intends to abandon her mission to expand and never talk about the Vanthampurs again.\\nKaejil Orunmar (human commoner), a tax collector who has been harassing the Vanthampurs. The Duke has given order to have him killed and fed to the rats.\\nYou then battle two imps, and successfully defeat them. Those in the group who have made attacks or casted spells in the combat with the imps are no longer invisible. Reya agrees to take the prisoners and bring them to safety. She will meet up with you later at the Elfsong Tavern.\\n\\nYou all descend from the tower peak into the Duke’s study once again. This time, due to being visible, you are attacked by the Helmed Horror. After a short combat, the group defeats the helmed horror, but has drawn the attention of a guard due to the noise.\\n\\nYou quickly knock out and tie up the guard, arguing over what to do with him. Eventually the guard is placed in one of the upstairs cells, in hopes he will awaken for questioning.\\n\\nOnce the coast is clear, Reya and both prisoners climb down the second floor balcony, to the front courtyard and exit through the stable doors on the south west wall.\\n\\nYou then continue to search the rooms north of the study, the powder room, followed by the master bedroom. The master bedroom contains a padlocked iron chest, the padlock in the shape of a horned devils scowling visage. The chest contained three ledgers, written in Infernal (records of the Duke’s legitimate business dealings), calligraphy supplies, a poisoner\'s kit and a pouch with 86gp.\\n\\nThe chest gives way to a false bottom containing a spring poison trap; it releases a 10 ft sphere of poisonous gas around the chest.\\n\\nSearching the Duke’s study, you discover various hats, fine clothing, perfume and expensive hair brushes. You also find two potions of healing.\\n\\nEntering into the hallway, you immediately come across four human guards. You dispose of them unceremoniously, and search the south room to discover Thurstwell Vantrhampur, a frail and sickly looking man and the son of Duke Thalamar Vanthampur. He attempts to engage in combat with some cantrips, but is eventually taken hostage by the group. His imp is murdered, and the group is interrupted by three more guards coming from over the stairs. ",\n    "tags": [\n        "Combat: Boss Fight",\n        "Storyline: Plot Twist"\n    ],\n}\n\n',
        },
        {
          role: "user",
          content: "",
        },
        {
          role: "assistant",
          content:
            "In Session 2, the group, with the help of Reya Mantlemorn, infiltrates the Vanthampur Villa using invisibility potions. They rescue two human prisoners being held captive by the Duke - Shaleen Zoraz and Kaejil Orunmar. After a successful battle with imps, the group loses their invisibility but manages to defeat a Helmed Horror. They tie up a guard for questioning and allow Reya to escort the prisoners to safety at the Elfsong Tavern.\n\nExploring further, the group finds valuable items in the Duke's study, including ledgers written in Infernal, potions of healing, and a trapped chest with deadly poison gas. They also encounter and defeat human guards, leading to a confrontation with Thurstwell Vanthampur, the Duke's son. The son is taken hostage after his imp is killed, and the group faces more guards approaching to intervene.\n\nThe session involved stealth, combat, rescuing prisoners, discovering valuable items, and facing unexpected twists like the Duke's son being captured. The group's actions have drawn attention and raised the stakes as they navigate through the heavily guarded villa.",
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response;
  } catch (error) {
    console.error("Error generating summary:", error);
    return null;
  }
}

export default CampaignSummarizer;
