import { Request, Response } from 'express';
import usersService from '../service/users.service';

const findAll = async (req: Request, res: Response):Promise<void> => {
  const { status, data } = await usersService.findAll();
  res.status(status).json(data);
};
  
export default {
  findAll,
};