import * as express from 'express'
const router = express.Router()
// import check from 'express-validator'
import * as expressValidator from 'express-validator'
const user_controller = require('../controllers/user.controller')

router.post(
	'/register',
	[
		expressValidator.check('email', 'Некорректный email').isEmail(),
		expressValidator
			.check('password', 'Минимальная длина пароля 8 символов')
			.isLength({
				min: 8,
			}),
	],
	user_controller.register
)

router.post(
	'/login',
	[
		expressValidator.check('email', 'Некорректный email').isEmail(),
		expressValidator
			.check('password', 'Минимальная длина пароля 8 символов')
			.isLength({
				min: 8,
			}),
	],
	user_controller.login
)

module.exports = router
