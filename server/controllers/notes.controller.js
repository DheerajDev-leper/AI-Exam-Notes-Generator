import Notes from "../models/notes.model.js"

export const getMyNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.userId })
            .select("topic classLevel examType revisionMode includeDiagram includeChart createdAt")
            .sort({ createdAt: -1 })

        return res.status(200).json(notes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getSingleNote = async (req,res) => {
    try {
        const note = await Notes.findOne({
            _id: req.params.id,
            user: req.userId
        })
        if(!note){
            return res.status(404).json({message: "Note not found"})
        }
        return res.status(200).json({
            content: note.content,
            topic: note.topic,
            classLevel: note.classLevel,
            createdAt: note.createdAt,
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
}