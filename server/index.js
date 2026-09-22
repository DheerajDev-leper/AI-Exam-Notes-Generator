import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/connectdb.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import notesRouter from "./routes/generate.route.js"
import pdfRouter from "./routes/pdf.route.js"
dotenv.config()


const app = express()
app.use(express.json())

app.use(cors(
    {origin:"http://localhost:5173",
        credentials:true,
        methods:["GET","POST","PUT","DELETE","OPTIONS"]
    }
))

app.use(cookieParser())
const port = process.env.PORT || 5000

app.get("/", (req,res) => {
    res.json({message: "Server is running"})
})

app.use("/api/auth", authRouter)
app.use("/api/user",userRouter)
app.use("/api/notes",notesRouter)
app.use("/api/pdf", pdfRouter)


app.listen(port,()=> {
    console.log("Server running")
    connectDB()
})