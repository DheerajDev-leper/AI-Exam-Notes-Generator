import jwt from "jsonwebtoken"

const isAuht = async(req,res,next) => {
    try{
        let {token} = req.cookies
        if(!token){
            return res.status(400).json({message:"Token not found"})
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"token not valid"})
        }
        req.userId = verifyToken.userId
        next()
    }catch (err){
        return res.status(500).json({message:`Auth error ${err}`})

    }
}

export default isAuht