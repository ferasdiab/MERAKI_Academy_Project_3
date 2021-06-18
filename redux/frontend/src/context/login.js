import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export const LoginContext = React.createContext();

const LoginProvider = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [token, setToken] = useState('');
	const [userId, setUserId] = useState('');

	const state = {
		setEmail,
		setPassword,
		message,
		login,
		userId,
		token,
		loggedIn,
		logout,
	};

	useEffect(() => {
		saveToken(localStorage.getItem('token'));
	}, []);

	function saveToken(token) {
		const user = jwt.decode(token);
		if (user) {
			setToken(token);
			setUserId(user.userId);
			localStorage.setItem('token', token);
		}
	}

	async function login() {
		try {
			const res = await axios.post('http://localhost:5000/login', {
				email,
				password,
			});

			saveToken(res.data.token);
			setLoggedIn(true);
		} catch (error) {
			setMessage(error.response.data);
		}
	}

	function logout() {
		setLoggedIn(false);
		localStorage.clear();
	}

	return (
		<LoginContext.Provider value={state}>
			{props.children}
		</LoginContext.Provider>
	);
};

export default LoginProvider;
