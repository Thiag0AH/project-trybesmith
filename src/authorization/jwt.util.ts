import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'placeholder';

type Payload = {
  id: number,
  username: string
};
const create = (payload: Payload): string => {
  const token = jwt.sign(payload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '5d',
  });
  
  return token;
};

const verify = (payload: string): Payload => {
  const token = jwt.verify(payload, SECRET) as Payload;
  return token;
};

export default {
  create,
  verify,
};