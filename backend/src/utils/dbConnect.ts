import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const DB_URL=process.env.DB_URL

const options = {
    
    serverSelectionTimeoutMS: 5000
};

export async function dbConnect():Promise<void>{
    if(!DB_URL) throw new Error("db url is not availbale")

    if(mongoose.connection.readyState===1){
        console.log("already connected to db")
        return
    }

    try {
        await mongoose.connect(DB_URL, options);
        console.log("Successfully connected to DB");
    } catch (error) {
        console.error("Error while connecting to DB:", error);
        throw error;
    }

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });
}