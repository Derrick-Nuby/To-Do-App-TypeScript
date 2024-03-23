import { Router } from "express"
import { authJWT } from "../middleware/auth";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todos"

import { validateTodoCreation, validateTodoUpdate } from '../middleware/validation';

const router: Router = Router()


router.get("/", authJWT, getTodos)

router.post("/", authJWT, validateTodoCreation, addTodo)

router.put("/:id", authJWT, validateTodoUpdate, updateTodo)

router.delete("/:id", authJWT, deleteTodo)

export default router