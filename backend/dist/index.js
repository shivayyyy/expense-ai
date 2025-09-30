import express, {} from "express";
import dotenv from "dotenv";
import { dbConnect } from "./utils/dbConnect.js";
import User from "./models/models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import auth from "./middleware/auth.js";
import cors from "cors";
import Expense from "./models/expensModel.js";
function getNameInitial(name) {
    return name ? name.charAt(0).toUpperCase() : '';
}
dotenv.config();
dbConnect();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("jwt secret is missing from env");
}
const app = express();
//middleware section
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//api routes swection
app.listen(PORT, () => {
    console.log("listining on ", PORT);
});
app.post("/api/v1/signup", async (req, res) => {
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
        const user = new User({ avatar: getNameInitial(name), name, email, password: hashedPassword });
        await user.save();
        const userPayload = {
            id: user._id,
            email: user.email,
            name: user.name,
            avatar: user.avatar
        };
        const token = await jwt.sign(userPayload, JWT_SECRET, { expiresIn: "49h" });
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 49 * 60 * 60 * 1000
        });
        res.status(200).json(token);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
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
        const userPayload = {
            id: user._id,
            email: user.email,
            name: user.name
        };
        const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: "49h" });
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 49 * 60 * 60 * 1000
        });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
app.get("/api/v1/userInfo", auth, async (req, res) => {
    const userData = req.user;
    res.json(userData);
});
app.post("/api/v1/addExpense", auth, async (req, res) => {
    //get all the data
    const { amount, description, date, category, paymentMethod, merchant } = req.body;
    const userId = await req.user?.id;
    if (!userId || !amount || !description || !date || !category || !paymentMethod || !merchant) {
        res.status(401).json("alll fields are required to add expense");
    }
    //add the expense
    const expenseData = {
        userId,
        amount,
        description,
        date,
        category,
        paymentMethod,
        merchant
    };
    try {
        const expense = new Expense(expenseData);
        const addResponse = await expense.save();
        res.status(200).json("successfully added the expense");
    }
    catch (error) {
        console.log("error occured during adding expense", error);
    }
});
app.get("/api/v1/fetchExpense", auth, async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User ID not found" });
        }
        // Get all expenses for calculations
        const allExpenses = await Expense.find({ userId });
        // Get recent 5 transactions
        const recentTransactions = await Expense.find({ userId })
            .sort({ date: -1,
            createdAt: -1
        }) // Sort by date in descending order
            .limit(5);
        const totalLength = allExpenses.length;
        // Calculate total amount using reduce
        const totalAmount = allExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        // Group expenses by category
        const expensesByCategory = allExpenses.reduce((acc, expense) => {
            const category = expense.category;
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += expense.amount;
            return acc;
        }, {});
        res.status(200).json({
            expenses: allExpenses,
            recentTransactions,
            totalExpenses: totalLength,
            totalAmount,
            expensesByCategory
        });
    }
    catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Error fetching expenses", error });
    }
});
app.post("/api/v1/expenses/bulkDelete", auth, async (req, res) => {
    const { ids } = req.body;
    ids.map(async (id, i) => {
        await Expense.findByIdAndDelete(id);
        console.log(`expenses is deleted with id ${id}`);
    });
});
//# sourceMappingURL=index.js.map