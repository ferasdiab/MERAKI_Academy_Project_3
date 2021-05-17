const express = require("express");
const { uuid } = require("uuidv4");

const db = require("./db");
const { users, articles } = require("./schema");


const app = express();
const port = 5000;
app.use(express.json());

////



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
app.post("/articles", async (req,res)=>{
let userId 

await users.findOne({firstName:"omar"})
.then((result)=>{
  userId = result._id
}).catch((err) => {
  res.send(err);
});

const {title,description} = req.body
  const newArticle = new articles({
    title,
    description,
    author:userId})

    newArticle.save()
    .then((result)=>{
      res.status(201)
      res.json(result)
    }).catch((err) => {
      res.send(err);
    });
});

//////////////////////////////////////////////

app.get("/articles", (req,res)=>{
  articles.find({})
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
  // query parameters way: "/articles/search_1?author=Jouza"
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
///////////////////////////////////////////////////////////////////////
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


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
