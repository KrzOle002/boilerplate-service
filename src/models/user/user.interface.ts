import { Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    isEmailVerified: boolean;

    // Define methods on the User model
    isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
    isEmailTaken(email: string, excludeUserId?: string): Promise<boolean>;
}
