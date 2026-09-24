import jwt from "jsonwebtoken"

// 401 (not 400/500) so the client can tell "signed out" from a real error
const isAuth = (req, res, next) => {
  const token = req.cookies?.token
  if (!token) return res.status(401).json({ message: "Please sign in" })
  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).userId
    next()
  } catch {
    return res.status(401).json({ message: "Session expired, please sign in again" })
  }
}

export default isAuth
