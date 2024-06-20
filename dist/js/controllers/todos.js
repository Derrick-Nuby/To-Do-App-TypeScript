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
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../models/todo"));
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
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const todos = yield todo_1.default.find({ createdBy: userId });
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const userId = req.userId;
        const todo = new todo_1.default({
            name: body.name,
            description: body.description,
            completed: body.completed,
            createdBy: userId,
        });
        const newTodo = yield todo.save();
        res
            .status(201)
            .json({ message: "Todo added", todo: newTodo });
    }
    catch (error) {
        throw error;
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const todoId = req.params.id;
        const updateFields = req.body;
        const updatedTodo = yield todo_1.default.findOneAndUpdate({ _id: todoId, createdBy: userId }, updateFields, { new: true });
        if (!updatedTodo) {
            res.status(404).json({ message: "Todo not found or user does not have permission to update" });
            return;
        }
        res.status(200).json({
            message: "Todo updated",
            todo: updatedTodo,
        });
    }
    catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const todoId = req.params.id;
        const deletedTodo = yield todo_1.default.findOneAndDelete({ _id: todoId, createdBy: userId });
        if (!deletedTodo) {
            res.status(404).json({ message: "Todo not found or user does not have permission to delete this todo" });
            return;
        }
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
        });
    }
    catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteTodo = deleteTodo;
