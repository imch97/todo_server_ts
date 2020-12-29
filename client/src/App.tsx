import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Loader } from './components/loader/loader'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/auth_context'

import 'materialize-css'
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        //{todo place your todo header here }
        Your todo list
      </header>
      <section>
        <TodoList/>
      </section>
    </div>
  );
}
*/

function App() {
	const { token, userId, login, logout, ready } = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)

	if (!ready) {
		return <Loader />
	}

	return (
		<AuthContext.Provider
			value={{
				token,
				login,
				logout,
				userId,
				isAuthenticated,
			}}
		>
			<Router to="/todoitems">
				<div className="container">{routes}</div>
			</Router>
		</AuthContext.Provider>
	)
}

export default App
