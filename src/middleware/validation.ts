import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
  name: 
  Joi.string()
    .required()
    .min(4)
    .pattern(new RegExp('^[a-zA-Z0-9 ]+$'))
    .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.pattern.base': 'Name must contain only alphanumeric characters Or a space',
  }),
  email: Joi.string()
    .email()
    .required()
    .messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format',
  }),
  password: 
  Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.#$!%*?&^])[A-Za-z\\d@.#$!%*?&^]{8,15}$'))
    .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least {#limit} characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    }),
});

const loginSchema = Joi.object({
    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format',
  }),
    password: 
    Joi.string()
        .required()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.#$!%*?&^])[A-Za-z\\d@.#$!%*?&^]{8,15}$'))
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least {#limit} characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        })
});



const todoSchema = Joi.object({
    name: Joi.string()
    .required()
    .min(8)
    .messages({
        'string.empty': 'To Do Name is required',
        'string.min': 'A To Do Item must have at least {#limit} characters long as its name',
    }),
    description: Joi.string()
    .required()
    .min(16)
    .messages({
        'string.empty': 'To Do description is required',
        'string.min': 'A To Do Item description must have at least {#limit} characters long',
    }),
    completed: Joi.boolean()
    .invalid(true)
    .default(false),

    // createdBy: Joi.string()
    // .required()
    // .messages({
    //     'string.empty': 'Created by is required mean no token',
    // }),
});

const todoUpdateSchema = Joi.object({
    name: Joi.string()
    .required()
    .min(8)
    .messages({
        'string.empty': 'To Do Name is required',
        'string.min': 'A To Do Item must have at least {#limit} characters long as its name',
    }),
    description: Joi.string()
    .required()
    .min(16)
    .messages({
        'string.empty': 'To Do description is required',
        'string.min': 'A To Do Item description must have at least {#limit} characters long',
    }),
    completed: Joi.boolean()
    .default(false)
});


const validateUserRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = await userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join('; ');
      return res.status(400).json({ error: errorMessage });
    }
    next();
  } catch (err) {
    console.error('Error validating user Creation:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const validateUserLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = await loginSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join('; ');
        return res.status(400).json({ error: errorMessage });
      }
      next();
    } catch (err) {
      console.error('Error validating user Login:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  

const validateTodoCreation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = await todoSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join('; ');
        return res.status(400).json({ error: errorMessage });
      }
      next();
    } catch (err) {
      console.error('Error Creating a todo:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

const validateTodoUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = await todoUpdateSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join('; ');
        return res.status(400).json({ error: errorMessage });
      }
      next();
    } catch (err) {
      console.error('Error Updating a Todo:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export { validateUserRegister, validateUserLogin, validateTodoCreation, validateTodoUpdate };
