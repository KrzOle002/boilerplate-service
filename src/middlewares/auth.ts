import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { roleRights } from '../config/roles';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user/user.interface';
type VerifyCallback = (
    req: Request,
    resolve: () => void,
    reject: (reason?: any) => void,
    requiredRights: string[]
) => (err: any, user?: IUser, info?: any) => Promise<void>;

const verifyCallback: VerifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    if (requiredRights.length) {
        const userRights = roleRights.get(user.role) || [];
        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
        if (!hasRequiredRights && req.params.userId !== user.id) {
            return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
        }
    }
    resolve();
};

const auth =
    (...requiredRights: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        return new Promise<void>((resolve, reject) => {
            passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(
                req,
                res,
                next
            );
        })
            .then(() => next())
            .catch((err) => next(err));
    };
export default auth;
