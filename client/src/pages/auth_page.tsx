import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/auth_context'
import './AuthPage.scss'

export const AuthPage = () => {
	const auth = useContext(AuthContext)
	const message = useMessage()
	const { loading, request, error, clearError } = useHttp()
	const [form, setForm] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])
	/*
	useEffect(() => {
		window.M.updateTextFields()
	}, [])
	*/
	const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
		setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value })
	}

	const registerHandler = async () => {
		try {
			const data = await request('/api/user/register', 'POST', { ...form })
			message(data.message)
		} catch (e) {
			console.log('Errors', e)
		}
	}

	const loginHandler = async () => {
		try {
			const data = await request('/api/user/login', 'POST', { ...form })
			auth.login(data.token, data.userId)
		} catch (e) {
			console.log('Errors', e)
		}
	}

	return (
		<div className="row center">
			<div className="col s6 offset-s3 center">
				<h1>ToDo`s</h1>
				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title">Авторизация</span>
						<div>
							<div className="input-field">
								<input
									placeholder="Введите email"
									id="email"
									type="text"
									name="email"
									className="yellow-input"
									value={form.email}
									onChange={changeHandler}
								/>
								<label htmlFor="email">Email</label>
							</div>

							<div className="input-field">
								<input
									placeholder="Введите пароль"
									id="password"
									type="password"
									name="password"
									className="yellow-input"
									value={form.password}
									onChange={changeHandler}
								/>
								<label htmlFor="email">Пароль</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button
							className="btn yellow darken-4"
							style={{ marginRight: 10 }}
							disabled={loading}
							onClick={loginHandler}
						>
							Войти
						</button>
						<button
							className="btn grey lighten-1 black-text"
							onClick={registerHandler}
							disabled={loading}
						>
							Регистрация
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
