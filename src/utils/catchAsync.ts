import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const catchAsync =
    (fn: (req: Request<ParamsDictionary, any, any, ParsedQs>, res: Response, next: NextFunction) => any) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };

export default catchAsync;
