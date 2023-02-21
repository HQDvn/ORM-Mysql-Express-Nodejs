import Joi from 'joi';

const validatorRegister = (data) => {
  const registerSchema = Joi.object({
    fullname: Joi.string().alphanum().min(5).max(30).required().messages({
      'string.min': 'Fullname must be at least 5 characters long',
      'string.max': 'Fullname must not exceed 30 characters',
      'string.alphanum': 'Fullname must only contain alpha-numeric characters',
      'string.empty': 'Fullname is required',
    }),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .lowercase()
      .required()
      .messages({
        'string.email':
          'Invalid email format, please provide a valid email address',
        'string.empty': 'Email is required',
      }),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9d@$!%*?&.]{6,32}$'))
      .required()
      .messages({
        'string.pattern.base':
          'Password must contain at least 6 characters and at most 32 characters',
        'string.empty': 'Password is required',
      }),
    passport: Joi.string()
      .pattern(new RegExp('^[A-Z0-9]{8,12}$'))
      .required()
      .messages({
        'string.pattern.base':
          'Passport must contain 8 to 12 uppercase alphanumeric characters',
        'string.empty': 'Passport is required',
      }),
    phone: Joi.string()
      .regex(/^[0-9]{10,11}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone must contain 10 to 11 numeric characters',
        'string.empty': 'Phone is required',
      }),
    role: Joi.string().valid('admin', 'staff', 'customer').required().messages({
      'any.only': 'Role must be one of "admin", "staff", or "customer"',
      'string.empty': 'Role is required',
    }),
  });

  return registerSchema.validate(data);
};

export default validatorRegister;
