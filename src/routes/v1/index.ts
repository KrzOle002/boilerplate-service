import express from 'express';
import userRouter from '../v1/user.route';
import config from '../../config/config';

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: userRouter,
    },
    {
        path: '/users',
        route: userRouter,
    },
];

const devRoutes = [
    // routes available only in development mode
    {
        path: '/docs',
        route: userRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

export default router;
