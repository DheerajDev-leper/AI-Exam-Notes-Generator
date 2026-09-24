import Notes from "../models/notes.model.js"
import userModel from "../models/user.model.js"
import { generateGeminiResponse } from "../services/gemini.services.js"
import { buildPrompt } from "../utils/prompt.js"

const COST = 10
const clip = (v, n) => String(v ?? "").trim().slice(0, n)

export const generateNotes = async (req, res) => {
  const { revisionMode = false, includeDiagram = false, includeChart = false } = req.body
  const topic = clip(req.body.topic, 200)
  const classLevel = clip(req.body.classLevel, 100)
  const examType = clip(req.body.examType, 100)

  if (!topic) return res.status(400).json({ message: "Topic is required" })

  // Take the credits atomically first so two quick clicks can't overspend
  const user = await userModel.findOneAndUpdate(
    { _id: req.userId, credits: { $gte: COST } },
    { $inc: { credits: -COST } },
    { new: true }
  )
  if (!user) {
    const exists = await userModel.exists({ _id: req.userId })
    return exists
      ? res.status(402).json({ message: `Not enough credits. Each note costs ${COST}.` })
      : res.status(404).json({ message: "User not found" })
  }

  try {
    const content = await generateGeminiResponse(
      buildPrompt({ topic, classLevel, examType, revisionMode, includeDiagram, includeChart })
    )
    const note = await Notes.create({
      user: user._id, topic, classLevel, examType, revisionMode, includeDiagram, includeChart, content,
    })
    await userModel.updateOne(
      { _id: user._id },
      { $push: { notes: note._id }, $set: { isCreditAvailable: user.credits >= COST } }
    )
    return res.status(200).json({ data: content, noteId: note._id, creditsLeft: user.credits })
  } catch (error) {
    console.error("generateNotes:", error.message)
    await userModel.updateOne({ _id: user._id }, { $inc: { credits: COST }, $set: { isCreditAvailable: true } }) // refund
    return res.status(502).json({ message: "The AI couldn't generate notes this time. You weren't charged, so please try again." })
  }
}
