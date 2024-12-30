import mongoose from "mongoose"

const connectDB =async()=>{

    mongoose.connection.on('connected',()=> {
        console.log("db connected successfully")
    })
     

    await mongoose.connect(`${process.env.MONGODB_URI}/doctor`)
}

export default connectDB;    