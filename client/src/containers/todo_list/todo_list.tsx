import React, { useState, useEffect, useContext, useCallback } from 'react'

import { connect } from 'react-redux'
import TodoItem from '../../components/todo_item/todo_item'
import {
	actions,
	fetchTodoUpdate as fetchTodoUpdateAction,
	getToDoList as getToDoListAction,
	removeOneToDo as removeOneToDoAction,
	removeComplteted as removeCompltetedAction,
	completeAllTodoUpdate as completeAllTodoUpdateAction,
} from './todo_slice'
import PropTypes from 'prop-types'
import ToDoInput from '../../components/todo_input/todo_input'
import { controlBadges } from '../../constants/constants'
import { AuthContext } from '../../context/auth_context'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { Loader } from '../../components/loader/loader'

import styled from 'styled-components'

interface InterfaceTodo {
	_id: string;
	completed: boolean;
	text: string;
	owner: string;
}

let namesButtonFilter: string[] = []
for (let i in controlBadges) {
	if (typeof controlBadges[i] === 'string') namesButtonFilter.push(i)
}

const BtnLogout = styled.label`
	text-align: right;
	margin-right: 20px;
	margin-top: 20px;
	font-size: 18px;
`
const AppHeader = styled.header`
	min-height: 10vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
`
const StyleTodoList = styled.div`
	background: white;
	border-radius: 4px;
	padding: 5px;
	max-width: 500px;
	margin: 0 auto;
	filter: drop-shadow(1px 1px 7px black);
`
const StyleList = styled.div`
	max-height: 400px;
	overflow-y: auto;
`

const StyleFooterSection = styled.div`
	text-align: right;
	vertical-align: middle;
	align-content: center;
	height: 35px;
`
const StyleFooter = styled.ul`
	margin: 0;
	display: flex;
	list-style: none;
	margin-top: 10px;
`
const StyleTaskCount = styled.li`
	padding-top: 3px;
	font-size: 12px;
	margin-top: 2px;
	font-family: sans-serif;
	color: gray;
	margin-right: 15px;

	:hover {
		cursor: pointer;
	}
`
const StyleClearTasksButton = styled.li`
	padding-top: 3px;
	font-size: 12px;
	margin-top: 2px;
	font-family: sans-serif;
	color: gray;
	float: right;
	margin-left: 20px;

	:hover {
		cursor: pointer;
	}
`
const StyleButtonFilter = styled.button.attrs((props) => ({}))`
	background: white;
	border: 1px solid gray;
	border-radius: 3px;
	:focus {
		background: none;
	}
	border: ${(props: {
		send: { name: string, state: { filter: string, items: InterfaceTodo } },
	}) =>
		props.send.name === props.send.state.filter ? '2px solid black' : 'none'};
`

const StyleHr = styled.hr`
	border: 0;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
`

const TodoList = (props: any) => {
	//---any
	//-------------------logout
	const history = useHistory()
	const auth = useContext(AuthContext)

	const logoutHandler = (event: React.MouseEvent<HTMLLabelElement>) => {
		event.preventDefault()
		auth.logout()
		history.push('/')
	}
	//-------------------logout

	const FILTER_MAP = {
		All: () => true,
		ToDo: (todo: InterfaceTodo) => !todo.completed,
		Completed: (todo: InterfaceTodo) => todo.completed,
	}

	const {
		todos,
		getToDoList,
		fetchTodoUpdate,
		removeOneToDo,
		removeComplteted,
		completeAllTodoUpdate,
		deleteTodo,
	} = props
	const [state, setState] = useState({ items: todos, filter: 'All' })

	useEffect(() => {
		setState({ ...state, items: todos })
	}, [todos])

	//load todoitems from MONGO

	const { loading, request } = useHttp()
	const { token } = useContext(AuthContext)

	const fetchItems = useCallback(async () => {
		getToDoList()
	}, [token, request])

	useEffect(() => {
		fetchItems()
	}, [fetchItems])

	if (loading) {
		return <Loader />
	}
	//load todoitems from MONGO

	const btnClick = (name: string) => () => {
		const todoList = todos.filter(FILTER_MAP[name])
		setState({ items: todoList, filter: name })
	}

	let kol = []
	function lostCountToDo(el: InterfaceTodo) {
		if (el.completed === true) {
			kol.push(el)
		}
	}
	/*
	const btnClass = (name, state) =>
		classnames({ activeButton: name === state.filter })
	*/
	return (
		<React.Fragment>
			<div>
				<BtnLogout onClick={logoutHandler}>
					<a href="/">LogOut</a>
				</BtnLogout>
			</div>
			<AppHeader>Your todo list</AppHeader>

			<StyleTodoList>
				<ToDoInput />
				{}
				<StyleHr />

				<StyleList>
					{state.items.map((todo: InterfaceTodo) => (
						<TodoItem
							//id={Number(todo._id)}
							//index={index}
							//key={todo._id}
							//text={todo.text}
							todo={todo}
							hide={() =>
								deleteTodo({
									_id: todo._id,
									text: todo.text,
									completed: todo.completed,
									owner: todo.owner,
								})
							}
							onRemove={() =>
								removeOneToDo({
									_id: todo._id,
									text: todo.text,
									completed: todo.completed,
									owner: todo.owner,
								})
							}
							markAsChecked={() =>
								fetchTodoUpdate({
									_id: todo._id,
									completed: todo.completed,
									text: todo.text,
								})
							}
						/>
					))}
				</StyleList>
				{todos.length !== 0 && (
					<StyleFooterSection>
						<StyleFooter>
							<StyleTaskCount onClick={completeAllTodoUpdate}>
								{todos.map((el: InterfaceTodo) => lostCountToDo(el))}
								{`${todos.length - kol.length} `}
								tasks left
							</StyleTaskCount>
							<li>
								{namesButtonFilter.map((name: string, index: number) => (
									<StyleButtonFilter
										send={{ name, state }}
										onClick={btnClick(name)}
										key={index}
									>
										<input
											type="radio"
											autoComplete="off"
											key={index}
											onClick={btnClick(name)}
											name={name}
										/>
										{name}
									</StyleButtonFilter>
								))}
							</li>
							<StyleClearTasksButton onClick={removeComplteted}>
								Clear completed
							</StyleClearTasksButton>
						</StyleFooter>
					</StyleFooterSection>
				)}
			</StyleTodoList>
		</React.Fragment>
	)
}

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
}

const mapStateToProps = (state: { todo: any }) => ({ todos: state.todo })
const mapDispatchToProps = {
	completeAllTodoUpdate: completeAllTodoUpdateAction,
	removeComplteted: removeCompltetedAction,
	fetchTodoUpdate: fetchTodoUpdateAction,
	getToDoList: getToDoListAction,
	removeOneToDo: removeOneToDoAction,
	deleteTodo: (todo: InterfaceTodo) => actions.deleteTodo(todo),
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
