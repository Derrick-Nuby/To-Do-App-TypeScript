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
  let token: string | undefined;

  const authorizationHeader = req.headers.authorization;
  
  
  if (authorizationHeader) {
      const parts = authorizationHeader.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
          token = parts[1];
      }
  } 
  if (!token) {
    token = req.cookies.jwt;
  }
  if (!token) {
    res.status(401).json({ error: 'Authentication required. Please log in.' });
    return;
  }

  if (token) {
    jwt.verify(token, 'jwtSecret', (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      const { id, username, email } = decoded;
      req.userId = id;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

export { authJWT };
