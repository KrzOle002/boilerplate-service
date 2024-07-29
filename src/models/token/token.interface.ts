import { Document } from 'mongoose';

export interface IToken extends Document {
    token: string;
    user: string;
    type: string;
    expires: Date;
    blacklisted: boolean;
}
