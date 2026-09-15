import UserModel from "../models/user.model.js"
import { getToken } from "../utils/token.js"

export const googleAuth = async(req, res) => {
    try{
        const {name, email} = req.body
        let user = await UserModel.findOne({email})
        if(!user){
            user = await UserModel.create({
                name, email
            })

        }
        let token = await getToken(user._id)
        res.cookie("token",token, {
            httpOnly:true,
            secure:false,
            samesite:"strict",
            maxAge:7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(user)

    }catch (err){
        return res.status(500).json({message:`googleSignUp Error ${err}`})
    }
}

export const logOut = async(req, res) => {
    try{
        await res.clearCookie("token")
        return res.status(200).json("LOGOUT Success")
    }catch (err){
        return res.status(500).json({message:`Logout Error ${err}`})
    }
}