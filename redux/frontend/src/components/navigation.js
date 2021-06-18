import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navigation({ token }) {
  const state = useSelector((state) => {
    return {
      token: state.token.token,
    };
  });

  return (
    <div className="Navigation">
      {!state.token ? <Link to="/register">Register</Link> : ""}
      {!state.token ? <Link to="/login">Login</Link> : ""}
      {state.token ? <Link to="/dashboard">Dashboard</Link> : ""}
      {state.token ? <Link to="/newArticle">New Articale</Link> : ""}
    </div>
  );
}
