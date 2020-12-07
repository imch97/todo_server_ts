import { Router } from 'express'
const router = Router()
import { check } from 'express-validator'
const user_controller = require('../controllers/user.controller')

router.post(
	'/register',
	[
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Минимальная длина пароля 8 символов').isLength({
			min: 8,
		}),
	],
	user_controller.register
)

router.post(
	'/login',
	[
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Минимальная длина пароля 8 символов').isLength({
			min: 8,
		}),
	],
	user_controller.login
)

module.exports = router
