import generateNPCchat from "../components/npcGeneratorChat";

const getNPCchat = async () => {
  const response = await generateNPCchat();
  console.log(response);
};

export default function Dashboard() {
  console.log(`This is my open ai key ${import.meta.env.VITE_OPENAI_API_KEY}`);
  getNPCchat();
}
