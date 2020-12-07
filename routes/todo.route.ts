import { Router } from 'express'
const router = Router()

const todoitem_controller = require('../controllers/todo.controller')
const auth = require('../middleware/auth.middleware.ts')

router.post('/', auth, todoitem_controller.todoCreateWithUsers)
router.get('/', auth, todoitem_controller.todoGet)
router.delete('/', auth, todoitem_controller.todoRemove)
router.put('/', auth, todoitem_controller.todoUpdate)

router.put('/all', auth, todoitem_controller.todoCompleteAll)
router.delete('/all', auth, todoitem_controller.todoDeleteCompleted)

module.exports = router
