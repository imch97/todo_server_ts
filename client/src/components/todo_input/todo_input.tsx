import React from 'react'
import { createToDo as createToDoAction } from '../../containers/todo_list/todo_slice'
import { useState } from 'react'
import { connect } from 'react-redux'

const ToDoInput = (props: any) => {
	//--- ANY
	const { createToDo } = props

	const [value, setValue] = useState('')

	const pressHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			createToDo(value)
			event.currentTarget.value = ''
		}
	}

	return (
		<input
			type="text"
			className="input"
			placeholder="Enter your task name here"
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onKeyPress={pressHandler}
		/>
	)
}

const mapDispatch = {
	createToDo: createToDoAction,
}

export default connect(null, mapDispatch)(ToDoInput)
