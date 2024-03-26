import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import loginMock, { validPassword } from '../../mocks/login.mock';
import loginService from '../../../src/service/login.service';


describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  it('should return token with valid password', async () => {
    const loginBuild = UserModel.build(loginMock)
    sinon.stub(UserModel, 'findOne').resolves(loginBuild);
    const login = {
      username: loginMock.username,
      password: validPassword,
    };

    const test = await loginService.login(login);

    expect(test.data).to.have.property('token');
    expect(test.status).to.be.eq(200);
  });
  it('should return error messsage with invalid password', async () => {
    const loginBuild = UserModel.build(loginMock)
    sinon.stub(UserModel, 'findOne').resolves(loginBuild);
    const login = {
      username: loginMock.username,
      password: 'invalidPassword',
    };

    const test = await loginService.login(login);

    expect(test.data).to.have.property('message');
    expect(test.status).to.be.eq(401);
  });
});
