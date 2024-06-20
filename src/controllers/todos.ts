import { Response, Request } from "express"
import { ITodo } from "../types/todo"
import Todo from "../models/todo"



/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */




const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const todos: ITodo[] = await Todo.find({ createdBy: userId });
    res.status(200).json({ todos })
  } catch (error) {
    throw error
  }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick<ITodo, "name" | "description" | "completed">

      const userId = req.userId;
  
      const todo: ITodo = new Todo({
        name: body.name,
        description: body.description,
        completed: body.completed,
        createdBy: userId,
      })
  
      const newTodo: ITodo = await todo.save()
  
      res
        .status(201)
        .json({ message: "Todo added", todo: newTodo})
    } catch (error) {
      throw error
    }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
      const userId = req.userId;
      const todoId = req.params.id;
      const updateFields = req.body;

      const updatedTodo: ITodo | null = await Todo.findOneAndUpdate(
          { _id: todoId, createdBy: userId },
          updateFields,
          { new: true }
      );

      if (!updatedTodo) {
          res.status(404).json({ error: "Todo not found or user does not have permission to update" });
          return;
      }

      res.status(200).json({
          message: "Todo updated",
          todo: updatedTodo,
      });
  } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {

      const userId = req.userId;
      const todoId = req.params.id;

      const deletedTodo: ITodo | null = await Todo.findOneAndDelete({ _id: todoId, createdBy: userId });

        if (!deletedTodo) {
            res.status(404).json({ error: "Todo not found or user does not have permission to delete this todo" });
            return;
        }

        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
        });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const statusTodo = async (req: Request, res: Response): Promise<void> => {
  try {
      const userId = req.userId;
      const todoId = req.params.id;
      const completed = req.body;

      const updatedTodo: ITodo | null = await Todo.findOneAndUpdate(
          { _id: todoId, createdBy: userId },
          completed,
          { new: true }
      );

      if (!updatedTodo) {
          res.status(404).json({ error: "Todo not found or user does not have permission to update" });
          return;
      }

      res.status(200).json({
          message: "Todo status updated",
          todo: updatedTodo,
      });
  } catch (error) {
      console.error("Error marking to do as done or undone:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
  
export { getTodos, addTodo, updateTodo, deleteTodo, statusTodo }