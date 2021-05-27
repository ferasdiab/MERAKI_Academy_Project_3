import React, { useState } from "react";
import axios from "axios";

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const chick = ()=>{

  };

  return (
    <div>
      <div className="NewArticle">
        <p>NewArticle:</p>
        <div className="NewArticleInput">
          <input
            type="text"
            placeholder="title here"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input id = "NewArticleDescription"
            type="text"
            placeholder="description here"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="NewArticleButton">
          <button onClick={chick}>Create New Article </button>
        </div>
      </div>
    </div>
  );
}
