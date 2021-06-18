import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from './../context/login';

const Login = () => {
	const loginContext = useContext(LoginContext);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		loginContext.login();
		if (loginContext.loggedIn) {
			history.push('/dashboard');
		}
	};

	const redirect = () => {
		if (loginContext.loggedIn) {
			history.push('/dashboard');
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="email here"
					onChange={(e) => loginContext.setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password here"
					onChange={(e) => loginContext.setPassword(e.target.value)}
				/>
				<button>Login</button>
			</form>

			{redirect()}
			{loginContext.message && <div>{loginContext.message}</div>}
		</>
	);
};

export default Login;
