import React ,{useState} from 'react';
import { Switch, Route, Link, useParams, useHistory } from 'react-router-dom';
import './App.css';
import Navigation from "./components/Navigation"
import Register from "./components/Register"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import NewArticle from "./components/NewArticle"



export default function App() {
const [token, setToken] = useState('');
  return (
    <div className="app">
      <Navigation token = {token} />
      <Route exact path="/register" component={Register}  />
      <Route exact path="/login" render={() => <Login loginFun={setToken} token = {token} />} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/newArticle"  render={() => <NewArticle  token = {token} />} />
     
      


    </div>
  );
}
