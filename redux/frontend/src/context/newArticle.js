import React, { useState, useContext } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { LoginContext } from './login';

export const NewArticleContext = React.createContext();

const NewArticleProvider = (props) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [message, setMessage] = useState('');

	const loginContext = useContext(LoginContext);

	const state = {
		setTitle,
		setDescription,
		message,
		createNewArticle,
	};

	function validateToken() {
		const user = jwt.decode(loginContext.token);
		if (!user) throw new Error();
	}

	async function createNewArticle() {
		try {
			validateToken();

			await axios.post(
				'http://localhost:5000/articles',
				{
					title,
					description,
					author: loginContext.userId,
				},
				{
					headers: {
						Authorization: `Bearer ${loginContext.token}`,
					},
				},
			);

			setMessage('The article has been created successfully');
		} catch (error) {
			console.log(error);
			setMessage(
				'Error happened while creating a new article, please try again',
			);
		}
	}

	return (
		<NewArticleContext.Provider value={state}>
			{props.children}
		</NewArticleContext.Provider>
	);
};

export default NewArticleProvider;
