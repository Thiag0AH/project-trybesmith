import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import productService from '../../../src/service/product.service'
import mockProduct from '../../mocks/product.mock';
import UserModel from '../../../src/database/models/user.model';
import userMock from '../../mocks/user.mock';

const { mockValidProduct, product } = mockProduct;

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  it('should return Product with id and status 201', async () => {
    const productBuild = ProductModel.build(mockValidProduct);
    const userBuild = UserModel.build(userMock.findAllMock[0]);
    sinon.stub(ProductModel, 'create').resolves(productBuild);
    sinon.stub(UserModel, 'findByPk').resolves(userBuild);

    const test = await productService.insert(product);

    expect(test.status).to.eq(201);
    expect(test.data).to.have.property('id');
    expect(test.data).to.have.property('name');
    expect(test.data).to.have.property('price');
    expect(test.data).to.have.property('userId');
  });
  it('should GET Product list and Status 200', async () => {
    const productBuild = ProductModel.build(mockValidProduct);
    const productArray = [productBuild];
    sinon.stub(ProductModel, 'findAll').resolves(productArray);

    const test = await productService.findAll();

    expect(test.status).to.eq(200);
  })
});
