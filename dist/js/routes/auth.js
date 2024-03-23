"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post("/create", validation_1.validateUserRegister, auth_1.createAccount);
router.post("/login", validation_1.validateUserLogin, auth_1.loginUser);
exports.default = router;
