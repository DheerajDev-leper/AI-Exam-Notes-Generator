import "dotenv/config" // must load before any module reads process.env
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./utils/connectdb.js"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import notesRouter from "./routes/generate.route.js"
import pdfRouter from "./routes/pdf.route.js"

const app = express()
app.use(express.json({ limit: "2mb" })) // PDF export posts the whole note
app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))

app.get("/", (req, res) => res.json({ message: "Server is running" }))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/notes", notesRouter)
app.use("/api/pdf", pdfRouter)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: "Something went wrong on the server" })
})

const port = process.env.PORT || 8000
connectDB().then(() => app.listen(port, () => console.log(`Server running on ${port}`)))
