import bcrypt from "bcryptjs";
import { Response, Request } from "express"
import { IUser } from "../types/user"
import User from "../models/user"
import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const createAccount = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "A user with that email already exists, if that is you.. please login or reset your password" });
    }

    const user: IUser = new User({
      name,
      email,
      password,
    })

    const newUser: IUser = await user.save()
    
    res
      .status(201)
      .json({ message: "User Created Successfuly", user: { name, email } })
  } catch (error) {
    throw error
  }
}

const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const { id, name, email: userEmail } = user;
    
    const token = jwt.sign({ id, username: name, email: userEmail }, 'jwtSecret', { expiresIn: '1h' })

    res.status(200).json({ message: "User logged in successfully", user: { id, username: name, email: userEmail }, token });
  } catch (error) {
    // Handle any errors
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createAccount, loginUser }