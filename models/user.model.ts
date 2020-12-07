import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

let UserSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
})

module.exports = mongoose.model('User', UserSchema)
