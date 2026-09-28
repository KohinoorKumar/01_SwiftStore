import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [2, "Name must be at least 2 characters long"],
        maxLength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
        trim: true, 
        lowercase: true, 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    passwordHash: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    refreshToken: {
        type: String,
    }
}, 
 {
    timestamps: true,
 }
)

const userModel = mongoose.model("users", userSchema)

export default userModel