import express from "express"
import userAuth from "../middleware/userAuth.js"
import { getUserInfo } from "../controller/userController.js"

const userRouter = express.Router()

userRouter.get('/user-info',userAuth,getUserInfo)

export default userRouter