# <a href="https://alliebourden.github.io/fableforge/">Visit FableForge Here!</a>

# FableForge - Get Coding Module 2 Project

## Module Two Project

In 2023, I joined the Get Coding mentorship program. This program offers individuals an opportunity to reskill themselves for the dynamic tech industry by equipping them with the essential tools and skills demanded by today's developers. As part of this program, students like me are paired with local mentors who provide guidance through each module.

As of March 2024, I have completed my second Get Coding project, FableForge.

## ⚔️ FableForge

FableForge | a toolkit designed for 5th edition Dungeon Masters to easily manage and enhance their campaigns.

### Features

- AI-powered NPC and map generators
- Session organizer with quest tracking
- Loot manager with Dungeons and Dragons item database integration
- Interactive dice roller for gameplay
- Engaging campaign summaries using session data

### Technologies Used

- React.js
- Vite
- OpenAI API
- Node.js
- Figma

## How to use

![FableForge Landing Page](https://github.com/alliebourden/fableforge/assets/127435154/04bb0100-ae4d-428d-b84b-1d6222731eb6)

The Dashboard contains the NPC Generator, the Map Generator and the Dice Roller. When using any of the AI tools, the user will be prompted to enter an OpenAI key. This key will be stored until the user refreshes the page.<br>
### 📺 [Watch this video for a walkthrough on how to use FableForge's OpenAI tools.](https://www.loom.com/share/be89f8b21b504073b01d3a6b3cd7172e?sid=0069a53a-6d09-4eff-87e7-3bd9f762c263)

### NPC Generator

The NPC generator creates non-player characters (NPCs) based on prompts entered by the user. Each generated NPC includes the following attributes:

- **Name**: The NPC's name.
- **Race**: The NPC's race or species.
- **Profession**: The NPC's occupation or role.
- **Description**: A brief description of the NPC's appearance or personality.
- **Friendliness Rating**: An indication of how friendly or hostile the NPC is out of 10.
- **Trait**: A unique characteristic or feature of the NPC.

![FableForge Dashboard](https://github.com/alliebourden/fableforge/assets/127435154/0f286972-3b7b-4c30-9a52-9be355b77fab)

Once the user has generated an NPC they would like to use, they can further enhance their gaming experience by generating an image based on the NPC's description.

![FableForge NPC Image](https://github.com/alliebourden/fableforge/assets/127435154/111bac22-2fd5-4d69-af54-cc7b45469579)

### Map Generator

The Map Generator creates maps using the users input as the prompt. It allows Dungeon Masters to quickly generate custom maps for their campaigns based on their specifications.

![FableForge map generation](https://github.com/alliebourden/fableforge/assets/127435154/dd60b840-a285-4b35-bd6b-2f7534f0e04a)

### Dice Roller

The Dice Roller tool allows users to select the type and number of dice needed to quickly get the result of rolls. It simplifies the process of rolling virtual dice for in-game actions, and plays a cute GIF when the user rolls the dice.

![FableForge Dice Roller](https://github.com/alliebourden/fableforge/assets/127435154/83724ec5-8d60-4174-80c3-6dea474a7874)

### Session List

Navigate to the Session List to log individual campaign sessions. 

![FableForge add session form](https://github.com/alliebourden/fableforge/assets/127435154/894311c4-095d-42c7-80be-57acb801d4cc)

Sessions are displayed on the right side, and clicking on an individual session reveals its details on the left side. Utilize the calendar tool to log the date of the next session, ensuring organized and efficient campaign management.

![FableForge Session List](https://github.com/alliebourden/fableforge/assets/127435154/346cc816-de81-4919-a80a-f37fcae18d82)

### Quest Tracker

The Quest Tracker tool allows users to log quests individually, sorting by main or side quest. Submit the quest details to the form.

![FableForge Quest Tracker Form](https://github.com/alliebourden/fableforge/assets/127435154/3ab23a3a-2bad-4008-8249-d694ae511865)

Logged quests are displayed on the left side of the page, and when clicked, the quest details are shown in the right panel.

![FableForge Quest Tracker](https://github.com/alliebourden/fableforge/assets/127435154/77258273-18af-493f-b458-57335aee09a7)

### Loot Manager

The Loot Manager tool enables Dungeon Masters to search through a database of items and add them to their list of loot. Loot items are displayed in a table below, allowing users to sort them alphabetically and delete items if needed.

![FableForge Loot Manager](https://github.com/alliebourden/fableforge/assets/127435154/d47e28ba-5c1e-42b5-9af5-35e62a1bf4e3)

Additionally, users can include notes on each item, providing detailed information and enhancing the management of treasures within their campaigns.

![FableForge Loot Manager](https://github.com/alliebourden/fableforge/assets/127435154/d49972b8-e5f9-4708-9bbc-4a78afcbd293)

### Campaign Summary

Utilize the Campaign Summary tool to generate a summary of all your logged sessions. If you haven't already, you will be prompted to enter your OpenAI API key. 

![FableForge OpenAI API key prompt](https://github.com/alliebourden/fableforge/assets/127435154/275711f9-f311-40bb-bde8-baef541fe4df)

The Campaign Summary tool uses the date from the logged sessions as the prompt, and the summary will be the response.

![FableForge Campaign Summary](https://github.com/alliebourden/fableforge/assets/127435154/5867d401-2ab4-4077-a71f-ef874c529dc4)

## Next Steps

In Module 3, I will be building on this application to add the following features:

- Implementing a database to securely store API keys for enhanced security.
- Introducing user profiles to personalize the experience and allow users to manage their data.
- Adding functionality to save session, quest, and loot data, providing users with the ability to track their campaign progress over time.

To ensure the effectiveness and accuracy of AI tools such as the NPC Generator and Map Generator, I plan to utilize a tool like LangSmith for testing and evaluation. LangSmith provides comprehensive testing capabilities for natural language processing models, allowing for thorough evaluation of AI-powered features within FableForge.

## Recent Updates
- FableForge is now using MUI for buttons!











