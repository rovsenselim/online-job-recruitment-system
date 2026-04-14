import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { type: String },
    companyName: { type: String },
    username: { type: String, required: true, unique: true },
    role: { type: String, enum: ["employee", "employer"], required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
