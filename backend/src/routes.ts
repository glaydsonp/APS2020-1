import { Router } from 'express'

import responseMiddleware from './middlewares/Response.middleware';
import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import TwoFactorAuthController from './controllers/TwoFactorAuthController';

const routes = Router()

// routes.use(responseMiddleware)


routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.post('/login', SessionController.create);
routes.post('/tfa', TwoFactorAuthController.create);

export default routes