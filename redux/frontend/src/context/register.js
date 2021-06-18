import React, { useState } from 'react';
import axios from 'axios';

export const RegisterContext = React.createContext();

const RegisterProvider = (props) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [age, setAge] = useState(0);
	const [counrty, setCountry] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('60a881b61c678a049ca406fe');
	const [message, setMessage] = useState('');

	const state = {
		setFirstName,
		setLastName,
		setAge,
		setCountry,
		setEmail,
		setPassword,
		setRole,
		addNewUser,
		message,
	};

	async function addNewUser() {
		try {
			await axios.post('http://localhost:5000/users', {
				firstName,
				lastName,
				age,
				counrty,
				email,
				password,
				role,
			});

			setMessage('The user has been created successfully');
		} catch (error) {
			setMessage('Error happened while register, please try again');
		}
	}

	return (
		<RegisterContext.Provider value={state}>
			{props.children}
		</RegisterContext.Provider>
	);
};

export default RegisterProvider;
