import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Невірний формат пошти').isEmail(),
    body('password', 'Пароль не менше 5-ти символів').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Невірний формат пошти').isEmail(),
    body('password', 'Пароль не менше 5-ти символів').isLength({min: 5}),
    body('firstName', 'Вкажіть імя').isLength({min: 3}),
    body('lastName', 'Вкажіть фамілію').isLength({min: 3}),
    body('phone', 'Введіть коректний формат').isMobilePhone('uk-UA')
]