// src/models/User.js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'doctor'],
        default: 'user'
    },
    specialization: {
        type: String,
        required: function () { return this.role === 'doctor' }
    },
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User