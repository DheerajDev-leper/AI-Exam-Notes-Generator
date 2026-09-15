import Notes from "../models/notes.model.js"
import userModel from "../models/user.model.js"
import { generateGeminiResponse } from "../services/gemini.services.js"
import { buildPrompt } from "../utils/prompt.js"

export const generateNotes = async (req, res) => {
    try {
        const {
            topic,
            classLevel,
            examType,
            revisionMode= false,
            includeDiagram= false,
            includeChart=false
        } = req.body
        if (!topic){
            return res.status(400).json({message:"Topic is required"})
        }
        const user = await userModel.findById(req.userId)
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        if(user.credits < 10){
            user.isCreditAvailable = false
            await user.save()
            return res.status(400).json({message:"Insufficient credits",})
        }
        const prompt = buildPrompt({topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart})
        const airesponse = await generateGeminiResponse(prompt)
        const notes = await Notes.create({
            user:user._id,
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart,
            content:airesponse
        })
        user.credits -=10;
        if(user.credits<=0) user.isCreditAvailable=false;
        if (!Array.isArray(user.notes)){
            user.notes=[]
        }
        user.notes.push(notes._id);
        await user.save();
        return res.status(200).json({
            data:airesponse,
            noteId:notes._id,
            creditsLeft:user.credits
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({messgae:"AI response error"})
    }
}