import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import 'dotenv/config'
import connectToDatabase from "./config/connectDB.js"
import userAuthRouter from "./routes/userAuthRoutes.js"
import userRouter from "./routes/userRoutes.js"
import todoRouter from "./routes/todoRoutes.js"


//opt generator

// const otpGenerator=(len=6)=>{
//     let otp="";
//     for(let i=0;i<len;i++){
//         otp+=Math.floor(Math.random()*10) 
//     }
//     return otp

// }
// console.log(String(Math.floor(100000 + Math.random()*900000)));

//configuaration
const app = express()
const PORT = process.env.PORT || 8000
connectToDatabase()

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:["http://localhost:5173"],credentials:true}))

//routes
app.get("/",(req,res)=>{
    res.json({message:"Hello from backend"})
})
app.use("/api/auth",userAuthRouter)
app.use("/api/user",userRouter)
app.use("/api/todo",todoRouter)

app.listen(PORT,()=>{
    console.log(`Server started at PORT:${PORT}`);
})