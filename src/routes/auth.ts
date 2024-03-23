import { Router } from "express"
import { createAccount, loginUser } from "../controllers/auth"
import { validateUserRegister, validateUserLogin } from '../middleware/validation';

const router: Router = Router()

router.post("/create", validateUserRegister, createAccount)

router.post("/login", validateUserLogin, loginUser)

export default router