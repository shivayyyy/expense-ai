import express from "express"
import dotenv from "dotenv"
import { dbConnect } from "./utils/dbConnect.js"
import User from "./models.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import auth from "./middleware/auth.js"
import cors from "cors"



dotenv.config();
dbConnect();
const PORT=process.env.PORT
const JWT_SECRET=process.env.JWT_SECRET
if(!JWT_SECRET){
    throw new Error("jwt secret is missing from env")
}

const app=express()

//middleware section
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:3000", credentials: true }));



//api routes swection


app.listen(PORT,()=>{
    console.log("listining on ", PORT)
})


app.post("/api/v1/signup",async(req,res)=>{
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const userPayload={
            id:user._id,
            email:user.email,
            name:user.name
        }
        const token=await jwt.sign(userPayload,JWT_SECRET,{expiresIn:"49h"})
        res.cookie("token",token,{
            httpOnly:true,
            sameSite: "strict",
            maxAge: 49 * 60 * 60 * 1000
        })
        res.status(200).json(token)

        
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const userPayload={
            id:user._id,
            email:user.email,
            name:user.name
        }

        const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "49h" });
        res.cookie("token",token,{
            httpOnly:true,
            sameSite: "strict",
            maxAge: 49 * 60 * 60 * 1000
        })
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});






