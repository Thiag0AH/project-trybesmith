import express from 'express';
import productController from './controller/product.controller';
import usersController from './controller/users.controller';
import loginController from './controller/login.controller';
import loginValidation from './middleware/login.middleware';
import productMiddleware from './middleware/product.middleware';

const { nameValidation, priceValidation, userIdValidation } = productMiddleware;

const app = express();

app.use(express.json());

app.post('/products', nameValidation, priceValidation, userIdValidation, productController.insert);

app.get('/products', productController.findAll);

app.get('/users', usersController.findAll);

app.post('/login', loginValidation, loginController.login);
export default app;
