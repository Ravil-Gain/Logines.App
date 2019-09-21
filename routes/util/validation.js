const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = {
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        date_of_birth: Joi.date().min(4).required(),
        email: Joi.string().min(6).email().required(),
        user_name: Joi.string().min(4).required(),
        password: Joi.string().min(5).required()
    };
    return Joi.validate(data, schema);
}

const loginValidation = data => {
    const schema = {
        user_name: Joi.string().min(4).required(),
        password: Joi.string().min(5).required()
    };
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;