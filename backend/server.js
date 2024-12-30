import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinery from './config/cloudinary.js'
import adminRouter from './routes/admin_route.js'


//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinery()

//midlleware

app.use(express.json())
app.use(cors())

//api endpoint
app.use('/api/admin',adminRouter)

app.get('/',(req,res)=>{
    res.send('API  WORKING')
})

app.listen(port,()=>{
    console.log("done",port);
})