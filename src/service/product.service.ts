import { Model } from 'sequelize';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import ServiceResponse from '../types/service.response';
import UserModel from '../database/models/user.model';

type ProductBody = Omit<Product, 'id'>;
async function insert({ name, price, userId }: ProductBody): Promise<ServiceResponse<Product>> {
  const user = await UserModel.findByPk(userId);
  if (!user) {
    return {
      data: { message: '"userId" not found' },
      status: 422,
    };
  }
  const data = (await ProductModel.create({ name, price, userId })).dataValues;
  return { data, status: 201 };
}

const findAll = async (): Promise<ServiceResponse<Model<Product, ProductInputtableTypes>[]>> => {
  const data = await ProductModel.findAll();
  return { data, status: 200 };  
};

export default {
  insert,
  findAll,
};