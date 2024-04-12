import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sayRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config();


console.log(process.env.MONGO)

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('connect to mongodb')
    })
    .catch((err) => {
        console.log(err)
    })

// const express = require('express')

const app = express()

app.use(express.json())

const port = 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!!!bro bro bro')
// })

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello World!!!broo')
})

app.get('/lullu', (req, res) => {
    res.send('sweet')
})

app.use('/', sayRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})