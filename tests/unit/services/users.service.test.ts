import { expect } from 'chai';
import sinon from 'sinon';
import userMock from '../../mocks/user.mock';
import productMock from '../../mocks/product.mock';
import UserModel from '../../../src/database/models/user.model';
import userService from '../../../src/service/users.service';
import ProductModel from '../../../src/database/models/product.model';

const { findAllMock } = userMock;
const { mockValidProduct } = productMock

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('should GET User list and Status 200', async () => {
    const userBuild = UserModel.bulkBuild(findAllMock);
    const prodBuild = ProductModel.bulkBuild([mockValidProduct]);
    sinon.stub(UserModel, 'findAll').resolves(userBuild);
    sinon.stub(ProductModel, 'findAll').resolves(prodBuild);

    const test = await userService.findAll();

    expect(test.status).to.eq(200);
  })
});
