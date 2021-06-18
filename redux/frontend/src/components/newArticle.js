import React, { useContext } from 'react';
import { NewArticleContext } from './../context/newArticle';

const NewArticle = () => {
	const newArticleContext = useContext(NewArticleContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		newArticleContext.createNewArticle();
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="article title here"
					onChange={(e) => newArticleContext.setTitle(e.target.value)}
				/>
				<textarea
					placeholder="article description here"
					onChange={(e) => newArticleContext.setDescription(e.target.value)}
				></textarea>
				<button>Create New Article</button>
			</form>

			{newArticleContext.message && <div>{newArticleContext.message}</div>}
		</>
	);
};

export default NewArticle;
