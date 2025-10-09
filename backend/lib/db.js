import mongoose from "mongoose";


// Connects to the MongoDB database using Mongoose and logs the connection status. 
// Exits the process if the connection fails.
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MONGODB", error.message);
        process.exit(1);
    }
}
