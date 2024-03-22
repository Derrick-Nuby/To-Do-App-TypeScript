import bcrypt from "bcryptjs";
import { Response, Request } from "express"
import { IUser } from "../types/user"
import User from "../models/user"
import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';

const createAccount = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, "name" | "email" | "password">

    const user: IUser = new User({
      name: body.name,
      email: body.email,
      password: body.password,
    })

    const newUser: IUser = await user.save()

    
    res
      .status(201)
      .json({ message: "User Created Successfuly", user: newUser})
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
    
    const token = jwt.sign({id: user.id, username: user.name, email: user.email}, 'jwtSecret', { expiresIn: '1h' })

    res.status(200).json({ message: "User logged in successfully", user, token });
  } catch (error) {
    // Handle any errors
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createAccount, loginUser }