import express from "express"
import isAuht from "../middleware/isAuth.js"
import { getCurrentUser } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.get("/currentUser",isAuht, getCurrentUser)

export default userRouter