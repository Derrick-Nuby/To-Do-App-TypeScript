import { Router } from "express"
import { authJWT } from "../middleware/auth";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todos"

const router: Router = Router()


router.get("/", authJWT, getTodos)

router.post("/", authJWT, addTodo)

router.put("/:id", authJWT, updateTodo)

router.delete("/:id", authJWT, deleteTodo)

export default router