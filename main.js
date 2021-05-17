const express = require("express");
const { uuid } = require("uuidv4");

const db = require("./db");
const { users, articles } = require("./schema");


const app = express();
const port = 5000;
app.use(express.json());

////

const articlesa = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];



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
app.post("/articles",async (req,res)=>{
let userId 
await users.findOne({firstName:"firas"})
.then((result)=>{
  console.log("h",result)
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


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////


const getAnArticleById = (req, res) => {
  const id = req.query.id;
  const found = articles.find((element, index) => {
    return element.id === parseInt(id);
  });
  if (found) {
    console.log(found);
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.json("not found");
  }
};


///////////////////////////////////////////////////////
const createNewArticle = (req, res) => {
  const obj = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    id: uuid(),
  };
  articles.push(obj);

  res.status(201);
  res.json(obj);
};
//app.post("/articles", createNewArticle);
///////////////////////////////////////////////////////////////////
const updateAnArticleById = (req, res) => {
  id = req.params.id;
  for (let i = 0; i < articles.length; i++) {
    if (id == articles[i].id) {
      if (req.body.title && req.body.description && req.body.author) {
        articles[i].title = req.body.title;
        articles[i].description = req.body.description;
        articles[i].author = req.body.author;
        res.status(200);
        res.json(articles[i]);
        return;
      }
      res.status(404);
      res.json("must enter all keys title, description and author");
    }
  }
  res.status(404);
  res.json(`not found article with id => ${id}`);
};
app.put("/articles/:id", updateAnArticleById);
//////////////////////////////////////////////
const deleteArticleById = (req, res) => {
  id = req.params.id;
  for (let i = 0; i < articles.length; i++) {
    if (id == articles[i].id) {
      articles.splice(i, 1);
      res.status(200);
      const obj = {
        success: true,
        massage: `Success Delete article with id => ${id}`,
      };
      res.json(obj);
      return;
    }
  }
  res.status(404);
  res.json(`not found article with id => ${id}`);
};
app.delete("/articles/:id", deleteArticleById);
///////////////////////////////////////////////////////
const deleteArticlesByAuthor = (req, res) => {
  const author = req.body.author;
  for (let i = 0; i < articles.length; i++) {
    if (author === articles[i].author) {
      articles.splice(i, 1);
      i = i - 1;
    }
  }
  const obj = {
    success: true,
    massage: `Success delete all the articles for the author => ${author}`,
  };
  res.json(obj);
};
app.delete("/articles", deleteArticlesByAuthor);
///////////////////////////////////////////////////////////////////


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
