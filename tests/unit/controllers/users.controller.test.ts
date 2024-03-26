import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import userMock from '../../mocks/user.mock';
import usersService from '../../../src/service/users.service';
import usersController from '../../../src/controller/users.controller'
import UserModel from '../../../src/database/models/user.model';

const { findAllMock } = userMock;

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('should return response with data and status 200', async () => {
    const service  = {
      data: [{
        username: 'teste',
        productIds: [7, 6, 5],
      }],
      status: 200
    }
    sinon.stub(usersService, 'findAll').resolves(service);
    await usersController.findAll(req, res);
      
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(service.data);
  });
});
