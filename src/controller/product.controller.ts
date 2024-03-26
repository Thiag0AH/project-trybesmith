import { Request, Response } from 'express';
import productService from '../service/product.service';

const insert = async (req: Request, res: Response):Promise<void> => {
  const { name, price, userId } = req.body;
  const { status, data } = await productService.insert({ name, price, userId });
  res.status(status).json(data);
};

const findAll = async (req: Request, res: Response):Promise<void> => {
  const { status, data } = await productService.findAll();
  res.status(status).json(data);
};

export default {
  insert,
  findAll,
};