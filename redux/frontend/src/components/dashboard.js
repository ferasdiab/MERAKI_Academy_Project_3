import React, { useContext, useEffect } from 'react';
import { DashboardContext } from './../context/dashboard';
import { LoginContext } from './../context/login';

const Dashboard = () => {
	const dashboardContext = useContext(DashboardContext);
	const loginContext = useContext(LoginContext);

	const handleClick = () => {
		dashboardContext.getAllArticles();
		dashboardContext.setShow(!dashboardContext.show);
	};

	const handleUpdateClick = (article) => {
		dashboardContext.setUpdateBox(!dashboardContext.updateBox);
		dashboardContext.setArticleId(article._id);
		dashboardContext.setTitle(article.title);
		dashboardContext.setDescription(article.description);
		if (dashboardContext.updateBox) dashboardContext.updateArticle(article._id);
	};

	useEffect(() => {
		dashboardContext.getAllArticles();
	}, []);

	return (
		<>
			<br />
			<button onClick={handleClick}>Get All Articles</button>
			{dashboardContext.show &&
				dashboardContext.articles.map((article) => (
					<div key={article._id}>
						<div>Title: {article.title}</div>
						<div>Description: {article.description}</div>
						<div>author: {article.author.firstName}</div>
						{article.author._id === loginContext.userId && (
							<>
								<button
									onClick={() => dashboardContext.deleteArticle(article._id)}
								>
									X
								</button>
								{dashboardContext.updateBox &&
									dashboardContext.articleId === article._id && (
										<form>
											<input
												type="text"
												defaultValue={article.title}
												placeholder="article title here"
												onChange={(e) =>
													dashboardContext.setTitle(e.target.value)
												}
											/>
											<textarea
												placeholder="article description here"
												defaultValue={article.description}
												onChange={(e) =>
													dashboardContext.setDescription(e.target.value)
												}
											></textarea>
										</form>
									)}
								<button onClick={() => handleUpdateClick(article)}>
									Update
								</button>
							</>
						)}
						<hr />
					</div>
				))}
		</>
	);
};

export default Dashboard;
