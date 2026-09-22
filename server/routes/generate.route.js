import express from "express"
import isAuht from "../middleware/isAuth.js"
import { generateNotes } from "../controllers/generate.controller.js"
import { getMyNotes, getSingleNote } from "../controllers/notes.controller.js"

const notesRouter = express.Router()

notesRouter.post("/generate-notes",isAuht, generateNotes)
notesRouter.get("/getNotes",isAuht, getMyNotes)
notesRouter.get("/:id",isAuht, getSingleNote)


export default notesRouter