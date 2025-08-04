 // backend/index.js (or your main server file)
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connetDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import assessmentRouter from './routes/assessmentRoute.js'; // Add this line

// -------- app config ----------
const app = express();
const port = process.env.PORT || 4000;
connetDB();
connectCloudinary();

// -------- middlewares ---------
app.use(express.json({ limit: '400mb' }));
app.use(cors());

// ------ api endpoints ------
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/assessments', assessmentRouter); // Add this line

app.get('/', (req, res) => {
  res.send('API WORKING...');
});

// -------- port listen -------
app.listen(port, () => {
  console.log('Server Running on port', port);
});