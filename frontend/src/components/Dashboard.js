import React, { useState , useEffect  } from "react";
import axios from "axios";

export default function Dashboard() {
    const [articles, setArticles] = useState([]);
    const [showMoreInfo, setShowMoreInfo] = useState([]);
    
    useEffect(() =>{
        axios.get("http://localhost:5000/articles").then((result)=>{
            setArticles(result.data)
                })
    }, []);
    
    
    
    
    
    const arr = []
    const NewArticle = articles.map((element,index)=>{
      arr.push(false)
      

      return (<div className = "allArticlesCH"> 
          <div className="articlesTitle">     
          <h2>{element.title}</h2>
          <button onClick = {()=>{
              
                const arr =[... showMoreInfo]
                arr[index]=!arr[index]
                setShowMoreInfo(arr)
              
              
            
          }}>more info</button>
          </div> 
          {showMoreInfo[index] ? <p>{element.description}</p>: "" }
          
          </div> )
          
  })
   
  return (
    <div className="Dashboard">
      <p>Dashboard</p>
      {/*<div className="DashboardButton">
        <button onClick={chick}>Get All Article</button>
      </div>  */}
      <div className="allArticlesP">
      {NewArticle}
      </div>
      
    </div>
  );
}
