import { Router } from 'express'

import responseMiddleware from './middlewares/Response.middleware';
import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'

const routes = Router()

// routes.use(responseMiddleware)


routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.post('/login', SessionController.create);

export default routes