import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';
import UserModel, { UserSequelizeModel } from '../database/models/user.model';
import ServiceResponse from '../types/service.response';

type DataFindAll = {
  username: string;
  productIds: number[];
}[];

const findProducts = async (users: UserSequelizeModel[])
: Promise<ProductSequelizeModel[][]> => {
  const prod = users.map(({ dataValues }) => {
    const userId = dataValues.id;
    const promise = ProductModel.findAll({ where: { userId } });
    return promise;
  });
  return Promise.all(prod);
};
async function findAll(): Promise<ServiceResponse<DataFindAll>> {
  const users = await UserModel.findAll();
  const products = await findProducts(users);
  const data = products
    .map((prodArray, index) => {
      const productIds = prodArray.map(({ dataValues }) => dataValues.id);
      return {
        username: users[index].dataValues.username,
        productIds,
      };
    });
  return { data, status: 200 };  
}

export default {
  findAll,
};