import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

export default function Navigation({token}) {
    
  return (
    <div className="Navigation">
          
      
      {!token ? <Link to="/register">Register</Link> :""}
      {!token ? <Link to="/login">Login</Link>   :""}
      {token ? <Link to="/dashboard">Dashboard</Link> :""}
      {token ? <Link to="/newArticle">New Articale</Link> :""}
    
      
    </div>
  );
}
