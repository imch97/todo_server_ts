//start server
require('dotenv').config()
const express = require('express')
// const mongoose = require('mongoose')
import * as mongoose from 'mongoose'
const path = require('path')
const bodyParser = require('body-parser')
const todoitem = require('./routes/todo.route')
const user = require('./routes/user.route')
// const app: express.Application = express()
const app = express()

const dev_db_url = `mongodb+srv://${process.env.USER_MONGO}:${process.env.PASSWORD_USER_MONGO}@cluster0.lxer2.mongodb.net/${process.env.NAME_DATABASE}?retryWrites=true&w=majority`
let mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(dev_db_url, mongooseOptions)
// mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
	next()
})

app.use('/api/todoitem', todoitem)
app.use('/api/user', user)

app.use('/', express.static(path.join(__dirname, '../../build/')))
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname + '/../../build/index.html'))
})

app.listen(process.env.PORT, () => {
	console.log('Server is up and running on port numner ' + process.env.PORT)
})
