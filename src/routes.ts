import express from 'express';
import { activeUsersController } from './controllers/active-users';
import { downwardsController } from './controllers/downwards-repos';
import {loginController} from './controllers/login';
import { tokenCheck} from './authorization/token-check';
import {page} from './controllers/page';


export const routes = express.Router();

routes.get('/v1/active/:user', activeUsersController);
routes.get('/v1/downwards/:repo', downwardsController);
routes.get('/v2/downwards/:repo', tokenCheck, downwardsController);
routes.get('/v1/login/', loginController);
routes.get('/',page );