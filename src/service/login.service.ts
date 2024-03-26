import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import jwtUtil from '../authorization/jwt.util';
import { Login, Token } from '../types/User';
import ServiceResponse from '../types/service.response';

const login = async ({ username, password }: Login): Promise<ServiceResponse<Token>> => {
  const user = await UserModel.findOne({ where: { username } });
  if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
    return {
      data: { message: 'Username or password invalid' },
      status: 401,  
    };
  } 
  const payload = {
    username,
    id: user.dataValues.id,
  };
  
  const token = jwtUtil.create(payload);
  const data = { token };
  return { data, status: 200 };
};

export default { login };