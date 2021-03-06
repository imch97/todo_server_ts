import { verify } from 'jsonwebtoken'
import { Request, Response } from 'express'
const ToDoItem = require('../models/todo.model')

interface Auth {
	userId: string;
	iat: number;
	exp: number;
}

exports.todoCreateWithUsers = async function (req: Request, res: Response) {
	try {
		const { text } = req.body

		const token: string = req.headers.authorization.split(' ')[1]
		const decoded: Auth = await verify(token, process.env.JWT_SECRET)

		const todoitem = new ToDoItem({
			text,
			state: 'inProgressive',
			owner: decoded.userId,
		})
		todoitem.save().then((result) => res.status(201).json(result))
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
		return e
	}
}

exports.todoGet = async function (req: Request, res: Response) {
	try {
		const token: string = req.headers.authorization.split(' ')[1]
		const decoded: Auth = await verify(token, process.env.JWT_SECRET)
		const todoitem = await ToDoItem.find({ owner: decoded.userId })

		res.json(todoitem)
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
		return e
	}
}

exports.todoRemove = async function (
	req: Request,
	res: Response,
	next: Function
) {
	try {
		const { _id } = req.body
		await ToDoItem.findByIdAndRemove({ _id }, function (err) {
			if (err) return next(err)

			res.send('Deleted successfully!')
		})
		//setTimeout(() => res.status(500).send(), 5000)
	} catch (e) {
		console.log(e)
		return e
	}
}

exports.todoUpdate = async function (
	req: Request,
	res: Response,
	next: Function
) {
	try {
		await ToDoItem.findByIdAndUpdate(
			req.body._id,
			{ $set: req.body },
			function (err) {
				if (err) return next(err)
				res.send('ToDo udpated.')
			}
		)
	} catch (e) {
		console.log(e)
		return e
	}
}

exports.todoCompleteAll = async function (
	req: Request,
	res: Response,
	next: Function
) {
	try {
		const token: string = req.headers.authorization.split(' ')[1]

		const decoded: Auth = await verify(token, process.env.JWT_SECRET)

		await ToDoItem.updateMany(
			{ owner: decoded.userId },
			{ $set: { state: 'completed' } },
			function (err) {
				if (err) return next(err)
				res.send('All ToDo`s Completed.')
			}
		)
	} catch (e) {
		console.log(e)
		return e
	}
}

exports.todoDeleteCompleted = async function (
	req: Request,
	res: Response,
	next: Function
) {
	try {
		const token: string = req.headers.authorization.split(' ')[1]

		const decoded: Auth = await verify(token, process.env.JWT_SECRET)

		await ToDoItem.deleteMany(
			{ owner: decoded.userId, state: 'completed' },
			function (err) {
				if (err) return next(err)
				res.send('All ToDo`s Completed.')
			}
		)
	} catch (e) {
		console.log(e)
		return e
	}
}
