import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js';
import cors from 'cors';



import cookieParser from 'cookie-parser';
dotenv.config();


mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('connect to mongodb')
    })
    .catch((err) => {
        console.log(err)
    })


const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());

const port = 3000


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/listings', listingRouter)

console.log("cors is working", process.env.CLIENT_URL)



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})