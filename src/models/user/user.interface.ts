import { Document, Model } from 'mongoose';
import { Filter, Option } from '../../types/filterType';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    isEmailVerified: boolean;
    isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
    paginate(filter: Filter, options: Option): unknown;
    isEmailTaken(email: string, excludeUserId?: number): Promise<boolean>;
}
