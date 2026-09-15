import express from "express"
import isAuht from "../middleware/isAuth.js"
import { generateNotes } from "../controllers/generate.controller.js"

const notesRouter = express.Router()

notesRouter.post("/generate-notes",isAuht, generateNotes)

export default notesRouter