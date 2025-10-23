import express from 'express'
import { registerController } from '../controllers/user.resgisterControllers.js';

const routes = express.Router();

routes.post('/register',registerController)

export default routes;