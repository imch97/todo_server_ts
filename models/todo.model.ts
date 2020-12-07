const mongoose = require('mongoose')
const { Types } = require('mongoose')
const Schema = mongoose.Schema

let ToDoSchema = new Schema({
	text: { type: String, required: true, max: 100 },
	state: { type: String, required: true },
	owner: { type: Types.ObjectId, ref: 'user' },
})

module.exports = mongoose.model('todo', ToDoSchema)
