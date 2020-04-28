import { Router } from 'express'

import responseMiddleware from './middlewares/Response.middleware';
import UserController from './controllers/UserController'

const routes = Router()

// routes.use(responseMiddleware)


routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

export default routes