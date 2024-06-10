import { Router, type Request, type Response } from "express";
import { error, success } from "../utils/rest";
import { type User, validateUser } from "../models";
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
import { apiKey } from "../config";
sgMail.setApiKey(apiKey);
console.log(apiKey)

const router = Router();

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


const SALT_LENGTH = 16;
const ITERATIONS = 100000;
const KEY_LENGTH = 64;


function hashPassword(password: string) {
  const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512');
  return {
    salt,
    hash: hash.toString('hex')
  };
}
function verifyPassword(password: string, salt: string, hash: string) {
  const verifyHash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, 'sha512').toString('hex');
  return hash === verifyHash;
}

// CREATE token

function generateToken(id: number) {
  return jwt.sign({ userId: id }, 'your_secret_key', { expiresIn: '1h' });
}


// LOGIN request

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = DEMO_USERS.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json(error("User not found"));
  }

  if (!verifyPassword(password, user.salt, user.password_hash)) {
    return res.status(401).json(error("Invalid username or password"));
  }

  return res.status(200).json(success("Login successful"));
});

// CREATE user account

router.post("/create-account", (req: Request, res: Response) => {
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
});

// FIND user by USER ID

router.get("/id/:id", (req: Request, res: Response) => {
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

// FIND by USERNAME

router.get("/username/:username", (req: Request, res: Response) => {
  const username = req.params.username;

  const user = DEMO_USERS.find((u) => u.username === username);
  
  if (!user) {
    return res.status(404).json(error("User not found"));
  }

  return res.status(200).json(success(user));
});

// UPDATE account by ID

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

// DELETE user by ID

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

// FORGOT password request

router.post("/forgot-password", async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = getUserByEmail(email);
  if (user) {
    try {
      if (user.id === undefined) {
        throw new Error("User ID is undefined");
      }
      const token = generateToken(user.id);
      await sendPasswordReset(email, token);
      return res.status(200).json(success({ message: "Password reset email sent successfully", token }));
    } catch (err) {
      console.error("Error sending password reset email:", err);
      return res.status(500).json(error("Failed to send password reset email"));
    }
  } else {
    return res.status(404).json(error("User not found"));
  }
});


export default router;

async function sendPasswordReset(email: string, token: string) {
  const resetLink = `http://localhost:5174/reset-password?token=${token}`;

  const msg = {
    to: email,
    from: 'fableforgenl@gmail.com',
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${resetLink}`,
    html: `<p>Click the following link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Password reset email sent successfully");

  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}
function getUserByEmail(email: string): User | undefined {
  return DEMO_USERS.find((u) => u.email === email);
}

router.get("/email/:email", (req: Request, res: Response) => {
  const email = req.params.email;

  const user = getUserByEmail(email);
  
  if (!user) {
    return res.status(404).json(error("User not found"));
  }

  return res.status(200).json(success(user));
});


// RESET password 

router.post("/reset-password", (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    console.log("Decoded Token:", decodedToken);
    const user = DEMO_USERS.find((u) => u.id === decodedToken.userId);
    if (!user) {
      console.log("User not found with ID:", decodedToken.userId);
      return res.status(404).json(error('User not found'));
    }
    const { salt, hash } = hashPassword(newPassword);
    user.password_hash = hash;
    user.salt = salt;
    console.log("Password reset successfully for user:", user.id);

    return res.status(200).json(success("Password reset successfully"));
  } catch (err) {
    console.error("Error in reset-password:", err);
    return res.status(404).json(error("Invalid or expired token"));
  }
});

