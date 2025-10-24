import express from 'express'
import { registerController } from '../controllers/user.resgisterControllers.js';
import { upload } from '../middlewares/multer.middleware.js';

const routes = express.Router();

routes.post('/register',upload.fields([
    {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),registerController)

export default routes;