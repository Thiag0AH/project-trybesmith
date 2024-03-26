import { NextFunction, Request, Response } from 'express';

const nameValidation = (req: Request, res: Response, next: NextFunction)
: void | Response<Record<string, number>> => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (typeof (name) !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' });
  }
  if (name.length < 3) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  }
  next();
};
const priceValidation = (req: Request, res: Response, next: NextFunction)
: void | Response<Record<string, number>> => {
  const { price } = req.body;
  if (!price) {
    return res.status(400).json({ message: '"price" is required' });
  }
  if (typeof (price) !== 'string') {
    return res.status(422).json({ message: '"price" must be a string' });
  }
  if (price.length < 3) {
    return res.status(422).json({ message: '"price" length must be at least 3 characters long' });
  }
  next();
};
const userIdValidation = (req: Request, res: Response, next: NextFunction)
: void | Response<Record<string, number>> => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: '"userId" is required' });
  }
  if (typeof (userId) !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }
  next();
};

export default {
  nameValidation,
  priceValidation,
  userIdValidation,
};