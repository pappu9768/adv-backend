import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        const url = process.env.MONGO_URL;
        const res = await mongoose.connect(url);
        console.log(`Database Connected successfully: ${res.connection.host}`)
    } catch (error) {
        console.error(error)
    }
} 