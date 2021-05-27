import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import userEvent from "@testing-library/user-event";

export default function Login({ loginFun, token }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const chick = () => {
    axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((result) => {
        if (result.status == 200) {
          loginFun(result.data.token);
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        setLoginError(error.response.data);
      });
  };
  return (
    <div className="login">
      <p>Login:</p>
      <div className="loginInput">
        <input
          type="text"
          placeholder="email here"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password here"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="RegisterButton">
        <button onClick={chick}>login</button>
      </div>
      <div>{loginError ? <p className="errCreated">{loginError}</p> : ""}</div>
    </div>
  );
}
