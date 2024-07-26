import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import config from './config';
import tokenTypes from './token';
import User from '../models/user/user.model';
import { JwtPayload } from 'jsonwebtoken';

const jwtOption = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: JwtPayload, done: VerifiedCallback) => {
    try {
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error('Invalid token type');
        }
        const user = await User.findById(payload.sub);
        if (!user) return done(null, false);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOption, jwtVerify);

export { jwtStrategy };
