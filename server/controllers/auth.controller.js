import { initializeApp, getApps } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import UserModel from "../models/user.model.js"
import { getToken } from "../utils/token.js"

// Verifying an ID token only needs the project id (no service account)
if (!getApps().length) initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID })

const isProd = process.env.NODE_ENV === "production"
const cookieBase = { httpOnly: true, secure: isProd, sameSite: isProd ? "none" : "lax" } // note: sameSite, not samesite

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body
    if (!idToken) return res.status(400).json({ message: "Missing sign-in token" })

    // Trust the verified token, never a name/email sent by the browser
    const { email, name } = await getAuth().verifyIdToken(idToken)
    if (!email) return res.status(400).json({ message: "Google account has no email" })

    let user = await UserModel.findOne({ email })
    if (!user) user = await UserModel.create({ name: name || email.split("@")[0], email })

    const token = await getToken(user._id)
    res.cookie("token", token, { ...cookieBase, maxAge: 7 * 24 * 60 * 60 * 1000 })
    return res.status(200).json(user)
  } catch (err) {
    console.error("googleAuth:", err.message)
    return res.status(401).json({ message: "Sign-in failed. Please try again." })
  }
}

export const logOut = (req, res) => {
  res.clearCookie("token", cookieBase)
  return res.status(200).json({ message: "Logged out" })
}