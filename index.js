import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import checkAuth from "./utils/checkAuth.js";
import cors from 'cors'
import { getMe, login, register } from "./controllers/UserController.js";
import { loginValidation, registerValidation } from "./validations/auth.js";

dotenv.config()
mongoose.connect('mongodb+srv://admin:Password@cluster0.pepcpiw.mongodb.net/auth?retryWrites=true&w=majority')

const app = express()
app.use(express.json())
app.use(cors())

app.post('/auth/login', loginValidation, login)
app.post('/auth/register', registerValidation, register)
app.get('/auth/current', checkAuth, getMe)

app.listen(4444, (err) => {
    if(err) {
        return console.log(err)
    }
})