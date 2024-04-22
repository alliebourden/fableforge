import { Router, type Request, type Response } from "express";
import { error, success } from "../utils/rest";
import { type User, validateUser } from "../models";

const router = Router();

const DEMO_USERS: User[] = [];
DEMO_USERS.push({
  user_id: 12345,
  name: "John Doe",
  email: "johndoe@testemail.com",
  username: "johndoe123",
  password_hash: "hash12345",
  salt: "salt12345",
});

router.post("/", (req: Request, res: Response) => {
  const user = validateUser(req.body);
  if (user === null) {
    return res.status(400).json(error("User data is not formatted correctly"));
  }

  if ("id" in user) {
    return res
      .status(400)
      .json(error("User ID will be generated automatically"));
  }

  const id = Math.floor(Math.random() * 1000000);

  const createdUser = {
    ...user,
    id,
  };
  DEMO_USERS.push(createdUser);

  return res.status(200).json(success(createdUser));
});

router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json(error("Invalid user ID"));
  }

  const user = DEMO_USERS.find((u) => u.id === id);
  if (user === undefined) {
    return res.status(404).json(error("User not found"));
  }

  return res.status(200).json(success(user));
});

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const users = DEMO_USERS.findIndex((user) => user.id === id);

  if (users === -1) {
    return res.status(404).json(error("User not found"));
  }

  const content = req.body;

  const updatedUser = validateUser(content);
  if (updatedUser === null) {
    return res.status(400).json(error("User data is not formatted correctly"));
  }

  if ("id" in updatedUser) {
    return res.status(400).json(error("User ID cannot be updated"));
  }

  const updatedUserContent = {
    ...DEMO_USERS[users],
    ...updatedUser,
    id,
  };

  DEMO_USERS[users] = updatedUserContent;

  return res.status(200).json(success(updatedUserContent));
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const selectedUser = DEMO_USERS.findIndex((user) => user.id === id);

  if (selectedUser === -1) {
    return res.status(404).json(error("User not found"));
  }
  try {
    DEMO_USERS.splice(selectedUser, 1);
    return res.status(200).json(success("User deleted successfully"));
  } catch (err) {
    return res.status(500).json(error("Error deleting user"));
  }
});

/**
 * Exercise:
 * 1. Implement PUT /api/user/:id
 *  - Put user should update the properties of an existing user given an ID, and the properties to update.
 *  - The body of the request will effectively be the same as the post, but instead of creating a new user, you
 *    should find the user that matches the given ID and update the properties of that user.
 *  - Be sure to validate the body of the request to ensure that the user data is formatted correctly.
 *  - Check your implementation by using postman to send a PUT request to http://localhost:3000/api/user/{{some_id}}
 *
 * 2. Implement DELETE /api/user/:id
 *  - Delete user should delete the user with the given ID.
 *  - Check your implementation by using postman to send a DELETE request to http://localhost:3000/api/user/{{some_id}}
 */

export default router;
