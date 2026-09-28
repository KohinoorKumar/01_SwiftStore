import mongoose from 'mongoose'
import config from './config.js'

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("Server successfully connected with mongodb")
    } catch (error) {

        console.log("Server failed to connect with mongodb")
    }
}

export default connectDB