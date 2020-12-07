import { verify } from 'jsonwebtoken'
import { Request, Response } from 'express'
// import * as express from 'express'

interface Auth {
	userId: string;
	iat: number;
	exp: number;
}

module.exports = async (req: Request, res: Response, next: Function) => {
	try {
		const token: string = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
		if (!token) {
			return res.status(401).json({ message: 'Нет авторизации' })
		}

		const decoded: Auth = await verify(token, process.env.JWT_SECRET)

		//req.user = decoded
		next()
	} catch (e) {
		res.status(401).json({ message: 'Нет авторизации' })
	}
}
