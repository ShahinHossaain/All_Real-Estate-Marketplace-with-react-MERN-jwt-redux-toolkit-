import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sayRouter from './routes/user.route.js'
dotenv.config();



mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('connect to mongodb')
    })
    .catch((err) => {
        console.log(err)
    })

// const express = require('express')
const app = express()
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