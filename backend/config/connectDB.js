import mongoose from "mongoose";

const connectToDatabase=async()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log('Database connected ✅');
            
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/user-auth`)
    } catch (error) {
        console.log('Failed to connect to database ❌:',error);
        
    }
}

export default connectToDatabase