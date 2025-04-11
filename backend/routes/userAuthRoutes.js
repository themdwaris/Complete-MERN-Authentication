import express from "express"
import { isAuthenticated, login, logout, register, resetPassword, sendResetPasswordOtp, sendVerifyEmailOTP, verifyEmail } from "../controller/userAuth.js"
import userAuth from "../middleware/userAuth.js"

const userAuthRouter = express.Router()

userAuthRouter.post("/register",register)
userAuthRouter.post("/login",login)
userAuthRouter.post("/logout",logout)
userAuthRouter.post("/send-verify-otp",userAuth,sendVerifyEmailOTP)
userAuthRouter.post("/verify-email",userAuth,verifyEmail)
userAuthRouter.get("/is-authenticated",userAuth,isAuthenticated)
userAuthRouter.post("/send-reset-otp",sendResetPasswordOtp)
userAuthRouter.post("/reset-password",resetPassword)


export default userAuthRouter