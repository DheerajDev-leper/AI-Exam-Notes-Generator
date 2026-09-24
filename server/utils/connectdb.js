import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("DB Connected Successfully")
  } catch (err) {
    console.error("DB connection failed:", err.message)
    process.exit(1)
  }
}

export default connectDB
