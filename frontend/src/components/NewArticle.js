import React, { useState } from "react";
import axios from "axios";

export default function NewArticle({ token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [massage, setMassage] = useState(false);
  const [errorMassage, setErrorMassage] = useState(false);
  const chick = () => {
      console.log(token)
    axios
      .post(
        "http://localhost:5000/articles",
        { title, description },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        if (result.status === 201) {
            setErrorMassage(false)
                      setMassage(true);
        }else{
            setErrorMassage("Error happened while creating new article, please try again")
        }
      }).catch(error=>{
        setErrorMassage("you need to login first")
          })
      
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
          <input
            id="NewArticleDescription"
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
        <div>
          {massage ? (
            <div className="created">The article has been created successfully</div>
          ) : (
            ""
          )}
        </div>
        <div >{errorMassage  ?  <div className = "errCreated"><p>{errorMassage}</p> </div> : "" }</div>
        
      </div>
    </div>
  );
}
