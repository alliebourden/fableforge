import { Router, type Request, type Response } from "express";
import { type User, validateUser } from "../models";
import { error, success } from "../utils/rest";
import { hashPassword } from "../utils/passwordstuff";

const DEMO_USERS: User[] = [];
DEMO_USERS.push({
  id: 12345,
  name: "John Doe",
  email: "johndoe@testemail.com",
  username: "johndoe123",
  password: 'myPassword123',
  password_hash: "hash12345",
  salt: "salt12345",
});

export const createUser = (req: Request, res: Response) => {
    const user = validateUser(req.body);
    if (user === null) {
      return res.status(400).json(error("User data is not formatted correctly"));
    }
  
    if ("id" in user) {
      return res
        .status(400)
        .json(error("User ID will be generated automatically"));
    }
  
    const { salt, hash } = hashPassword(user.password);
    const id = Math.floor(Math.random() * 1000000);
  
    const createdUser = {
      ...user,
      id,
      password_hash: hash,
      salt,
    };
    DEMO_USERS.push(createdUser);
  
    return res.status(200).json(success(createdUser));
  }