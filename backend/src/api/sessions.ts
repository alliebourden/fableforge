import { Router, type Request, type Response } from "express";
import { error, success } from "../utils/rest";
import { type Sessions, validateSession } from "../models";


const router = Router();

const demoArray: Sessions[] = [];
demoArray.push({
  id: 12345,
  userId: 67899,
  header: 'A Hasty Summon',
  date: '2024-03-26',
  body: 'You open your eyes, slowly drifting back into reality. You smack your lips, cracked and dry as they always are after a long night.',
  tags: [
      'Roleplay: NPC Interaction',
      'Storyline: Character Development',
  ]
});

router.post("/", (req: Request, res: Response) => {
  const session = validateSession(req.body)
  if (session === null) {
    return res.status(400).json(error("Session data is not formatted correctly"))
  }

  if ("id" in session) {
    return res
      .status(400)
      .json(error("Session ID will be generated automatically"));
  }
  const id = Math.floor(Math.random() * 1000000)
  const createdSession = {
    ...session,
    id
  }
  demoArray.push(createdSession)

  return res.status(200).json(success(createdSession));
})

router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json(error("Invalid user ID"));
  }

  const session = demoArray.find((u) => u.id === id)
  if (session === undefined) {
    return res.status(404).json(error("Session not found"));
  }

  return res.status(200).json(success(session))
})

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const sessions = demoArray.findIndex((session) => session.id === id)

  if (sessions === -1) {
    return res.status(404).json(error("Session not found"))
  }

  const content = req.body

  const updatedSession = validateSession(content)
  if (updatedSession === null) {
    return res.status(400).json(error("Session data is not formatted correctly"))
  }

  if ("id" in updatedSession) {
    return res.status(400).json(error("Session ID cannot be updated"))
  }

  const updatedSessionContent = {
    ...demoArray[sessions],
    ...updatedSession,
    id,
  };

  demoArray[sessions] = updatedSessionContent;

  return res.status(200).json(success(updatedSessionContent))
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const selectedSession = demoArray.findIndex((session) => session.id === id);

  if (selectedSession === -1) {
    return res.status(404).json(error("Session not found"));
  }
  try {
    demoArray.splice(selectedSession, 1);
    return res.status(200).json(success("Session deleted successfully"));
  } catch (err) {
    return res.status(500).json(error("Error deleting session"));
  }
});

export default router;
