import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { resetAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('', newUserValidator, userController.newUser);

//route to check login credentials
router.post('/login', userController.getLogin);

//route for forget Password
router.post('/forgetPwd', userController.forgetPassword);

//route to reset Password
router.put('/resetPwd/:token', resetAuth, userController.resetPassword);

export default router;
