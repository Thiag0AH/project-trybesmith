import bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

export const validPassword = 'valid_password'

const loginMock = {
    id: 256,
    username: 'teste',
    vocation: 'Guerreiro',
    level: 10,
    password: bcrypt.hashSync(validPassword, SALT_ROUNDS)
}

export default loginMock;