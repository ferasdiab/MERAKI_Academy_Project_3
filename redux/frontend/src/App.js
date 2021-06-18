import { Route } from 'react-router-dom';
import Navigation from './components/navigation';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import NewArticle from './components/newArticle';

function App() {
	return (
		<div className="App">
			<Navigation />
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<Route path="/dashboard" component={Dashboard} />
			<Route path="/newArticle" component={NewArticle} />
		</div>
	);
}

export default App;
