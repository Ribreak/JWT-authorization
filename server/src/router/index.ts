import express from 'express';
import userController from '../controllers/user-controller';
import {body} from 'express-validator'
import authMiddlewate from '../middlewares/auth-middleware';

const router = express.Router();

router.post('/registration', body('email').isEmail(), body('password').isLength({min: 3, max: 32}), userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddlewate, userController.getUsers);

export default router;