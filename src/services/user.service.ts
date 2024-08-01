import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { IUser } from '../models/user/user.interface';

import User from '../models/user/user.model';

const createUser = async (userBody: IUser) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    userBody.role = 'user';
    return User.create(userBody);
};

const queryUsers = async (filter: any, options: any) => {
    const users = await User.paginate(filter, options);
    return users;
};

const getUserById = async (id: string) => {
    return User.findById(id);
};

const getUserByEmail = async (email: string) => {
    return User.findOne({ email });
};

const updateUserById = async (userId: string, updateBody: Partial<IUser>) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, parseInt(userId)))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteUserById = async (userId: string) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    await User.findByIdAndDelete(userId);
    return user;
};

export default {
    createUser,
    queryUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
};
