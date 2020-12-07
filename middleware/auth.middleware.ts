import * as jwt from 'jsonwebtoken'
import * as express from 'express'

module.exports = (
	req: express.Request,
	res: express.Response,
	next: Function
) => {
	try {
		const token: string = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
		if (!token) {
			return res.status(401).json({ message: 'Нет авторизации' })
		}

		const decoded: object = jwt.verify(token, process.env.JWT_SECRET)
		console.log(typeof decoded)
		//req.user = decoded
		next()
	} catch (e) {
		res.status(401).json({ message: 'Нет авторизации' })
	}
}
