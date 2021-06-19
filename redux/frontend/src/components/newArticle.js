import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setArticle } from "../reducer/article/index";
import jwt from "jsonwebtoken";

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const state = useSelector((state) => {
    return {
      article: state.article.article,
      token: state.token.token,
    };
  });
  const user = jwt.decode(state.token);
  if (user) {
    setUserId(user.userId);
  }

  const addOne = () => {
	  console.log({title,description,userId});
  };

  return (
    <div>
      <input
        placeholder="title here "
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <textarea
        placeholder="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>
      <button onClick={addOne}>add new article</button>
	 
    </div>
  );
}
