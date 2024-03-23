"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
const authJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, 'jwtSecret', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token' });
            }
            const { id, username, email } = decoded;
            console.log('User ID:', id);
            console.log('Username:', username);
            console.log('Email:', email);
            req.userId = id;
            next();
        });
    }
    else {
        res.status(401).json({ message: 'No token provided' });
    }
};
exports.authJWT = authJWT;
