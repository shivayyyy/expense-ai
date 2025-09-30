import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    budget: {
        type: Number
    },
    avatar: {
        type: String,
        required: true,
        default: " "
    }
});
export default mongoose.model("User", UserSchema);
//# sourceMappingURL=models.js.map