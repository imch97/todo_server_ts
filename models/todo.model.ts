import { model, Schema, Types } from 'mongoose'

let ToDoSchema = new Schema({
	text: { type: String, required: true, max: 100 },
	state: { type: String, required: true },
	owner: { type: Types.ObjectId, ref: 'user' },
})

module.exports = model('todo', ToDoSchema)
