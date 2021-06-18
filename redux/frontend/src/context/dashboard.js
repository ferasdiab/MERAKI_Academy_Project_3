import React, { useState } from 'react';
import axios from 'axios';

export const DashboardContext = React.createContext();

const DashboardProvider = (props) => {
	const [articles, setArticles] = useState('');
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [updateBox, setUpdateBox] = useState(false);
	const [articleId, setArticleId] = useState(false);

	const state = {
		articles,
		show,
		updateBox,
		articleId,
		setArticleId,
		setTitle,
		setDescription,
		setUpdateBox,
		setShow,
		getAllArticles,
		updateArticle,
		deleteArticle,
		setArticleId,
	};

	async function getAllArticles() {
		try {
			const res = await axios.get('http://localhost:5000/articles');
			setArticles(res.data);
		} catch (error) {
			console.log(error);
		}
	}

	async function updateArticle(id) {
		try {
			await axios.put(`http://localhost:5000/articles/${id}`, {
				title,
				description,
			});
			getAllArticles();
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteArticle(id) {
		try {
			await axios.delete(`http://localhost:5000/articles/${id}`);
			getAllArticles();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<DashboardContext.Provider value={state}>
			{props.children}
		</DashboardContext.Provider>
	);
};

export default DashboardProvider;
