import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import TodoList from './containers/todo_list/todo_list'
import { AuthPage } from './pages/auth_page'

export const useRoutes = (isAuthenticated: boolean) => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/todoitems" exact>
					<TodoList />
				</Route>
				<Redirect to="/todoitems" />
			</Switch>
		)
	}

	return (
		<Switch>
			<Route path="/" exact>
				<AuthPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	)
}
