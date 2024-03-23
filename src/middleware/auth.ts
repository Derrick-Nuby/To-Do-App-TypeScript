import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';


declare global {
  namespace Express {
    interface Request {
      userId?: string; // Define the userId property as optional
    }
  }
}

const authJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'jwtSecret', (err: any, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      const { id, username, email } = decoded;
      console.log('User ID:', id);
      console.log('Username:', username);
      console.log('Email:', email);
      req.userId = id;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

export { authJWT };
