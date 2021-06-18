import React, { useContext } from 'react';
import { RegisterContext } from './../context/register';

const Register = () => {
	const registerContext = useContext(RegisterContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		registerContext.addNewUser();
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="firstName here"
					onChange={(e) => registerContext.setFirstName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="lastName here"
					onChange={(e) => registerContext.setLastName(e.target.value)}
				/>
				<input
					type="number"
					placeholder="age here"
					onChange={(e) => registerContext.setAge(e.target.value)}
				/>
				<input
					type="text"
					placeholder="country here"
					onChange={(e) => registerContext.setCountry(e.target.value)}
				/>
				<input
					type="email"
					placeholder="email here"
					onChange={(e) => registerContext.setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password here"
					onChange={(e) => registerContext.setPassword(e.target.value)}
				/>
				<button>Register</button>
			</form>

			{registerContext.message && <div>{registerContext.message}</div>}
		</>
	);
};

export default Register;
