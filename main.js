const express = require("express");
const { uuid } = require("uuidv4");
const axios = require("axios");

const db = require("./db");
const { users, articles,comments } = require("./schema");


const app = express();
const port = 5000;
app.use(express.json());

//////////////////////////////////////////////////
app.post("/users",(req,res)=>{
  const  {firstName,lastName,age,country,email,password}= req.body
  const newUser = new  users( {firstName,lastName,age,country,email,password})
  newUser.save().then((result)=>{
    res.status(201)
    res.json(result)
  }).catch((err) => {
    res.send(err);
  });
})

/////////////////////////////////////////////
app.post("/articles",  (req,res)=>{
  const {title,description,author} = req.body
  const newArticle = new articles({
    title,
    description,
    author})

    newArticle.save()
    .then((result)=>{
      res.status(201)
      res.json(result)
    }).catch((err) => {
      res.send(err);
    });
});
///////////////////////////////////////////////////////////
app.post("/login",(req,res)=>{
  const {email,password} = req.body;
  users.findOne({email:email,password:password}).then((result)=>{
    if (result){
    res.status(200);
    res.json("Valid login credentials");
    }else{
    res.status(401);
    res.json("Invalid login credentials")};
  }).catch((err) => {
    res.send(err);
  });
});

//////////////////////////////////////////////

app.get("/articles", (req,res)=>{
  articles.find({}).populate("comments","comment")
  .then(result=>{
    //console.log(result)
    res.status(200)
    res.json(result)
  }).catch((err) => {
    res.send(err);
  });
});

/////////////////////////////////

app.get("/articles/search_1",  (req,res)=>{
  // query parameters way: "/articles/search_1?author=id"
  const userId = req.query.author;
  articles.find({author:userId}).then((result)=>{
    res.status(200);
    res.json(result)
  }).catch((err) => {
    res.send(err);
  }); 

});
////////////////////////////////////////////////
app.get("/articles/search_2",(req,res)=>{
  const id = req.query.id;
  articles.find({_id:id}).populate("author","firstName").exec()
  .then((result)=>{
    res.status(200)
    res.json(result)
  }).catch((err) => {
    res.send(err);
  }); 
});
/////////////////////////////////////
app.put("/articles/:id",(req,res)=>{
  const id = req.params.id;
  const {title,description,author} = req.body
  if (req.body.title && req.body.description && req.body.author){
  articles.findByIdAndUpdate(id,{title,description,author}, {new:true})
  .then((result)=>{
    res.status(200)
    res.json(result)
  }).catch((err) => {
    res.send(err);
  });
 }else{
  res.status(404);
  res.json("must enter all keys title and  description ");
 }
});

///////////////////////////////////////////////////////////////////////
app.delete("/articles/:id",(req,res)=>{
  const id = req.params.id;
  articles.findByIdAndDelete(id).then((result)=>{
    res.status(200)
    res.json({
      success: true,
      massage: `Success Delete article with id => ${id}`,
    })
  }).catch((err) => {
    res.send(err);
  });
});
////////////////////////////////////////////////////////////////
app.delete("/articles",(req,res)=>{
  const author = req.body.author;

  articles.deleteMany({author:author}).then(result=>{
    res.status(200)
    res.json({
      success: true,
      massage: `Success delete all the articles for the author => ${author}`,
    })
  }).catch((err) => {
    res.send(err);
  });
});

///////////////////////////////////////////////////
app.post("/articles/:id/comments",(req,res)=>{
  const id = req.params.id
  const {comment,commenter} = req.body
  const newComment = new comments({comment,commenter})
  newComment.save().then(async (result)=>{
   await articles.update(
    { _id: id }, 
    { $push: { comments: result._id } }
);
    res.status(201)
    res.json(result)
  }).catch((err) => {
    res.send(err);
  });
});
///////////////////////////////////////////////////////////////////
app.get("/NewsAPI", (req,res)=>{
  axios.get("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b18b4145baa0495591f7dd5df9de3211")
  .then(result=>{
    res.send(result.data)
  }).catch((err) => {
    res.send(err);
  });
})

//////////////////////////////////////////////////////////////////////////////////
app.get("/WeatherAPI",(req,res)=>{
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Amman&appid=6706183b35592d6e9bd68b7fc3472f17`)
  .then(result=>{
    res.send(result.data.main)
  }).catch((err) => {
    res.send(err);
  });
})




////////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
