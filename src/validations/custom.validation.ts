import { CustomValidator } from 'joi';

const objectId: CustomValidator = (value, helpers) => {
    if (typeof value !== 'string' || !value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.error('any.invalid', { message: '"{{#label}}" must be a valid mongo id' });
    }
    return value;
};

const password: CustomValidator = (value, helpers) => {
    if (typeof value !== 'string' || value.length < 8) {
        return helpers.error('string.min', { message: 'password must be at least 8 characters' });
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helpers.error('string.pattern.base', { message: 'password must contain at least 1 letter and 1 number' });
    }
    return value;
};

export { objectId, password };
