import { configureStore } from '@reduxjs/toolkit'
import todo from '../containers/todo_list/todo_slice'

export default configureStore({
	reducer: {
		todo,
		// todo: //todo link here todo reducer from the slice
	},
	//middleware: applyMiddleware
})
