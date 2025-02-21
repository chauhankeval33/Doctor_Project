import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinery from './config/cloudinary.js';
import adminRouter from './routes/admin_route.js';
import doctorRouter from './routes/doctor_route.js';
import userRouter from './routes/userRoute.js';

// App configuration
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinery();

// Middleware
app.use(express.json());  // Ensure that the request body is parsed correctly
app.use(cors());

// API Endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('API WORKING');
});

app.listen(port, () => {
    console.log("Server is running on port", port);
});
