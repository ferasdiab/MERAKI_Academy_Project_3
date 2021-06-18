import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import{setArticle} from "../reducer/article/index"

export default function Dashboard() {
  const state = useSelector((state) => {
    return {
      article: state.article.article,
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:5000/articles").then((result) => {
		dispatch(setArticle(result.data))
	});
  }, []);

  const NewArticle = state.article.map((element, index) => {
    return (
      <div className="allArticlesCH">
        <div className="articlesTitle">
          <h2>{element.title}</h2>
          <p>{element.description}</p>
          <button>more info</button>
        </div>
      </div>
    );
  });

  return (
    <div className="Dashboard">
      <p>Dashboard</p>
      <div className="allArticlesP">{NewArticle}</div>
    </div>
  );
}
