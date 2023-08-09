import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const isUserExist = await UserModel.findOne({email: req.body.email})
        if(isUserExist) {
            return res.status(400).json({message: 'Користувач з таким email вже існує'})
        }
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const secret = process.env.JWT_SECRET

        const doc = new UserModel({
            email: req.body.email,
            hashPassword: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone
        })
        const user = await doc.save()
        const token = jwt.sign({id: user._id}, secret,{expiresIn: '10d'})
        const { hashPassword, ...userData } = user._doc
        res.json({...userData, token})
    } catch {
        res.status(500).json({message: 'відбулась помилка при реєстрації'})
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if(!user) {
            return res.status(400).json({message: 'Такого користувача не існує'})
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.hashPassword)
        if(!isValidPass) {
            return res.status(400).json({message: 'невірний логін/пароль'})
        }
        const secret = process.env.JWT_SECRET
        const token = jwt.sign({id: user._id}, secret,{expiresIn: '10d'})
        const { hashPassword, ...userData } = user._doc

        res.json({...userData, token})
    } catch {
        res.status(500).json({message: 'відбулась помилка при авторизації'})
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        if(!user) {
            return res.status(404).json({message: 'Користувача не знайдено'})
        }
        const {passwordHash, ...userData} = user._doc
        res.json(userData)
    } catch (e) {
        res.status(500).json({message: "Немає доступу"})
    }
}