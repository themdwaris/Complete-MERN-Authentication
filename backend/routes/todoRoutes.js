import express from "express"
import userAuth from "../middleware/userAuth.js"
import { addTodo, deleteTodo, getAllTodo, updateTodo } from "../controller/todoController.js"

const todoRouter = express.Router()

todoRouter.post("/add-todo",userAuth,addTodo)
todoRouter.get("/todo-list",userAuth,getAllTodo)
todoRouter.post("/update-todo",userAuth,updateTodo)
todoRouter.post("/delete-todo",userAuth,deleteTodo)

export default todoRouter