import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginService from '../../../src/service/login.service';
import loginController from '../../../src/controller/login.controller'
import loginMock, { validPassword } from '../../mocks/login.mock';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return response with data and status 200', async () => {
    const service  = {
      data: { token: `token` },
      status: 200
    }
    req.body = {
        username: loginMock.username,
        password: validPassword
    }
    sinon.stub(loginService, 'login').resolves(service);
    
    await loginController.login(req, res);
      
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(service.data);
  });
});
