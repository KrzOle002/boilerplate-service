import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { authService, userService, tokenService, emailService } from '../services';
import { Request, Response } from 'express';
import { IUser } from '../models/user/user.interface';

const register = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body as IUser);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send(user);
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
    if (typeof req.query.token == 'string') {
        await authService.resetPassword(req.query.token, req.body.password);
        res.status(httpStatus.NO_CONTENT).send();
    }
});

const sendVerificationEmail = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as IUser;

    const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
    await emailService.sendVerificationEmail(user.email, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
    if (typeof req.query.token == 'string') {
        await authService.verifyEmail(req.query.token);
        res.status(httpStatus.NO_CONTENT).send();
    }
});

export default {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail,
};
