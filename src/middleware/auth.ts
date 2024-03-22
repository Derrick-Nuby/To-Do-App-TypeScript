import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';

const authJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, 'jwtSecret', (err) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

export { authJWT };
