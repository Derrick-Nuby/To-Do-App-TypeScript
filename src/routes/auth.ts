import { Router } from "express"
import { createAccount, loginUser } from "../controllers/auth"

const router: Router = Router()

router.post("/create", createAccount)

router.post("/login", loginUser)

export default router