import * as jwt from 'jsonwebtoken'
import * as express from 'express'
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const User = require('../models/user.model.ts')

interface AnswerFind {
	_id: string;
	email: string;
	password: string;
}

exports.register = async function (
	req: express.Request,
	res: express.Response
) {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректный данные при регистрации',
			})
		}

		const { email, password } = req.body

		const candidate: AnswerFind | null = await User.findOne({ email })

		if (candidate) {
			return res
				.status(400)
				.json({ message: 'Такой пользователь уже существует' })
		}

		const hashedPassword: string = await bcrypt.hash(password, 12)
		const user = new User({ email, password: hashedPassword })
		console.log(user)
		await user.save()

		res.status(201).json({ message: 'Пользователь создан' })
	} catch (e) {
		console.log(e)

		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
	}
}

exports.login = async function (req: express.Request, res: express.Response) {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректный данные при входе в систему',
			})
		}

		const { email, password } = req.body

		const user: AnswerFind | null = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({ message: 'Пользователь не найден' })
		}

		const isMatch: boolean = await bcrypt.compare(password, user.password)

		if (!isMatch) {
			return res
				.status(400)
				.json({ message: 'Неверный пароль, попробуйте снова' })
		}

		const token: string = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET,
			{
				expiresIn: '1d',
			}
		)

		res.json({ token })
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
	}
}
