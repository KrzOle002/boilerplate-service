import mongoose from 'mongoose';
import { toJSON } from '../plugins';
import tokenTypes from '../../config/token';
import { IToken } from './token.interface';

const tokenSchema = new mongoose.Schema<IToken>(
    {
        token: {
            type: String,
            required: true,
            index: true,
        },
        user: {
            type: String,
            required: true,
            ref: 'User',
        },
        type: {
            type: String,
            enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
            required: true,
        },
        expires: {
            required: true,
            type: Date,
        },
        blacklisted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

tokenSchema.plugin(toJSON);

const Token = mongoose.model('Token', tokenSchema);

export default Token;
