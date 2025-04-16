import userService from "../service/user-service"
import {Request, Response, NextFunction} from 'express'
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error";

type MiddlewareParams = [Request, Response, NextFunction]

class UserController {
    async registration(...args: MiddlewareParams) {
        const [req, res, next] = args;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()));
            }
            const {email, password} = req.body;
            const userData = await userService.register(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async login(...args: MiddlewareParams) {
        const [req, res, next] = args;
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout(...args: MiddlewareParams) {
        const [req, res, next] = args;
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async activate(...args: MiddlewareParams) {
        const [req, res, next] = args;
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL || 'http://localhost:5000');
        } catch (e) {
            next(e);
        }
    }
    async refresh(...args: MiddlewareParams) {
        const [req, res, next] = args;
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async getUsers(...args: MiddlewareParams) {
        const [req, res, next] = args;
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController()