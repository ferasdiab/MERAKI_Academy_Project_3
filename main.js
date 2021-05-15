const express = require("express");
const { uuid } = require('uuidv4');



const app = express();
const port = 5000;
app.use(express.json());

////
const articles = [
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

const getAllArticles = (req, res) => {
  res.status(200);
  res.json(articles);
};

app.get("/articles", getAllArticles);

//////////////////////////////////////////////////

const getArticlesByAuthor = (req, res) => {
  // query parameters way: "/articles/search_1?author=Jouza"
  const author = req.query.author;

  const arr = articles.filter((element, index) => {
    return author === element.author;
  });
  res.status(200);
  res.json(arr);
};
app.get("/articles/search_1", getArticlesByAuthor);

////////////////////////////

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

app.get("/articles/search_2", getAnArticleById);

///////////////////////////////////////////////////////
const createNewArticle =  (req,res)=>{
    const obj = {
        title: req.body.title,
        description:req.body.description,
        author: req.body.author,
        id : uuid(),
    }
    articles.push(obj)

    res.status(201)
    res.json(obj)
}
app.post("/articles",createNewArticle)
///////////////////////////////////////////////////////////////////
const updateAnArticleById = (req,res)=>{
    id =  req.params.id
    for (let i=0; i < articles.length ; i++){
        if (id == articles[i].id ){
            if (req.body.title&&req.body.description&&req.body.author){
                articles[i].title= req.body.title
                articles[i].description= req.body.description
                articles[i].author= req.body.author
                res.status(200)
                res.json(articles[i])
                return
            }
            res.status(404)
            res.json("must enter all keys title, description and author")
        }
    }
    res.status(404);
    res.json("not found");
}
app.put("/articles/:id",updateAnArticleById)
//////////////////////////////////////////////
const deleteArticleById = (req,res)=>{
  id =  req.params.id
  for (let i=0; i < articles.length ; i++){
    if (id == articles[i].id ){
      articles.splice(i,1);
      res.status(200)
      const obj = {success : true,massage :`Success Delete article with id => ${id}`}
      res.json(obj)
    }
  }
  res.status(404);
    res.json(`not found article with id => ${id} `);
}
app.delete("/articles/:id",deleteArticleById)
///////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
