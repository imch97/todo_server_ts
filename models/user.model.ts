import { model, Schema } from 'mongoose'

let UserSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
})

module.exports = model('users', UserSchema)
