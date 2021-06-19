import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../reducer/login/index";

export default function Login() {
  const state = useSelector((state) => {
    return {
      token: state.token.token,
    };
  });
  const dispatch = useDispatch();
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
          console.log(result.data);
          dispatch(setToken(result.data.token));
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        //setLoginError(error.response.data);
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
