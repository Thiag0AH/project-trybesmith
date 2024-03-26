import { Request, Response } from 'express';
import loginService from '../service/login.service';

const login = async (req: Request, res: Response):Promise<void> => {
  const { username, password } = req.body;
  const { status, data } = await loginService.login({ username, password });
  res.status(status).json(data);
};

export default { login };