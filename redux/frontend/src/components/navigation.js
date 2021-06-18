import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LoginContext } from './../context/login';

const Navigation = () => {
	const loginContext = useContext(LoginContext);
	const history = useHistory();

	const handleClick = () => {
		history.push('/login');
		loginContext.logout();
	};

	return (
		<>
			{localStorage.getItem('token') ? (
				<>
					<Link to="/dashboard">Dashboard</Link>
					&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
					<Link to="/newArticle">Add New Article</Link>
					&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
					<button onClick={handleClick}>Logout</button>
				</>
			) : (
				<>
					<Link to="/register">Register</Link>
					&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
					<Link to="/login">Login</Link>
				</>
			)}
		</>
	);
};

export default Navigation;
