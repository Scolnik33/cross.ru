import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import User from '../models/User.js'

export const getme = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const { password, ...userData } = user._doc;

        res.json(userData)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Нет доступа'
        })
    }
}

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.password)

        if (!isValidPassword) {
            return res.status(404).json({
                message: 'Неверный логин или пароль'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {
            expiresIn: '30d'
        })

        const { password, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        })
    }
}

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const userPassword = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(userPassword, salt);

        const doc = new User({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash,
            about: req.body.about,
            speciality: req.body.speciality,
            avatar: req.body.avatar,
            role: req.body.role
        })

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {
            expiresIn: '30d'
        })

        const { password, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось зарегистрроваться'
        })        
    }
}