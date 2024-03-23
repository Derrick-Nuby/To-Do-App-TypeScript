"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTodoUpdate = exports.validateTodoCreation = exports.validateUserLogin = exports.validateUserRegister = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    name: joi_1.default.string()
        .required()
        .min(4)
        .pattern(new RegExp('^[a-zA-Z0-9]+$'))
        .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.pattern.base': 'Name must contain only alphanumeric characters',
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format',
    }),
    password: joi_1.default.string()
        .required()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.#$!%*?&^])[A-Za-z\\d@.#$!%*?&^]{8,15}$'))
        .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least {#limit} characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    }),
});
const loginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .required()
        .messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format',
    }),
    password: joi_1.default.string()
        .required()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.#$!%*?&^])[A-Za-z\\d@.#$!%*?&^]{8,15}$'))
        .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least {#limit} characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    })
});
const todoSchema = joi_1.default.object({
    name: joi_1.default.string()
        .required()
        .min(8)
        .messages({
        'string.empty': 'To Do Name is required',
        'string.min': 'A To Do Item must have at least {#limit} characters long as its name',
    }),
    description: joi_1.default.string()
        .required()
        .min(16)
        .messages({
        'string.empty': 'To Do description is required',
        'string.min': 'A To Do Item description must have at least {#limit} characters long',
    }),
    completed: joi_1.default.boolean()
        .invalid(true)
        .default(false)
});
const todoUpdateSchema = joi_1.default.object({
    name: joi_1.default.string()
        .required()
        .min(8)
        .messages({
        'string.empty': 'To Do Name is required',
        'string.min': 'A To Do Item must have at least {#limit} characters long as its name',
    }),
    description: joi_1.default.string()
        .required()
        .min(16)
        .messages({
        'string.empty': 'To Do description is required',
        'string.min': 'A To Do Item description must have at least {#limit} characters long',
    }),
    completed: joi_1.default.boolean()
        .default(false)
});
const validateUserRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield userSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join('; ');
            return res.status(400).json({ message: errorMessage });
        }
        next();
    }
    catch (err) {
        console.error('Error validating user Creation:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.validateUserRegister = validateUserRegister;
const validateUserLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join('; ');
            return res.status(400).json({ message: errorMessage });
        }
        next();
    }
    catch (err) {
        console.error('Error validating user Login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.validateUserLogin = validateUserLogin;
const validateTodoCreation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield todoSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join('; ');
            return res.status(400).json({ message: errorMessage });
        }
        next();
    }
    catch (err) {
        console.error('Error Creating a todo:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.validateTodoCreation = validateTodoCreation;
const validateTodoUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield todoUpdateSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join('; ');
            return res.status(400).json({ message: errorMessage });
        }
        next();
    }
    catch (err) {
        console.error('Error Updating a Todo:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.validateTodoUpdate = validateTodoUpdate;
