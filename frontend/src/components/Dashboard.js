import React, { useState , useEffect  } from "react";
import axios from "axios";

export default function Dashboard() {
    const [articles, setArticles] = useState([])
    useEffect(() =>{
        axios.get("http://localhost:5000/articles").then((result)=>{
            setArticles(result.data)
                })
    }, []);
    const chick = ()=>{
    
    }
  return (
    <div className="Dashboard">
      <p>Dashboard</p>
      {/*<div className="DashboardButton">
        <button onClick={chick}>Get All Article</button>
      </div>  */}
      <div className="allArticlesP">
      {articles.map((element,index)=>{
          return (<div className = "allArticlesCH"> 
              <h2>{element.title}</h2>
              <p>{element.description}</p>
              </div> )
      })}
      </div>
      
    </div>
  );
}
