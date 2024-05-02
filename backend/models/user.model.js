import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlenght: 6,
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female"],
        },
        profilePic: {
            type: String,
            default: "",
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        score: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
