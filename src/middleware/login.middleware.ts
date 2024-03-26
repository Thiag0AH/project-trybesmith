import { NextFunction, Request, Response } from 'express';

const loginValidation = (req: Request, res: Response, next: NextFunction)
: void | Response<Record<string, number>> => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  }
  next();
};

export default loginValidation;