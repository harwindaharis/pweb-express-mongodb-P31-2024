// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: any;
}
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    // res.status(401).json({ status: 'failed', message: 'No token provided' });
    throw new Error('No token provided');
  } 

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as CustomRequest).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ status: 'failed', message: 'Invalid token' });
  }
};
