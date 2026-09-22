import express from "express"
import isAuht from "../middleware/isAuth.js"
import { pdfDownload } from "../controllers/pdf.controller.js"

const pdfRouter = express.Router()

pdfRouter.post("/download",isAuht, pdfDownload)

export default pdfRouter