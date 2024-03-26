import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productController from '../../../src/controller/product.controller'
import productService from '../../../src/service/product.service';
import mockProduct from '../../mocks/product.mock';
import { Model } from 'sequelize';
import ProductModel, { ProductInputtableTypes } from '../../../src/database/models/product.model';
import { Product } from '../../../src/types/Product';

const { mockValidProduct, product } = mockProduct;
chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('should return response with data and status 201', async () => {
    req.body = product;
    const service  = {
      data: mockValidProduct,
      status: 201
    }
    sinon.stub(productService, 'insert').resolves(service);
    await productController.insert(req, res);
      
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mockValidProduct);
  });
  it('should return response with data and status 200', async () => {
    const product = ProductModel.build(mockValidProduct)
    const service  = {
      data: [product],
      status: 200
    }
    sinon.stub(productService, 'findAll').resolves(service);
    await productController.findAll(req, res);
      
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([product]);
  });

});
