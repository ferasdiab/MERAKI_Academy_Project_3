const express = require("express");

const app = express();
const port = 5000;
app.use(express.json());

////
const articles = [
    {
    id: 1,
    title: 'How I learn coding?',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    {
    id: 2,
    title: 'Coding Best Practices',
    description:
    'Lorem, ipsum dolor sit, Quam, mollitia.',
    author: 'Besslan',
    },
    {
    id: 3,
    title: 'Debugging',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    ];

 const getAllArticles=(req,res)=>{
        res.status(200)
        res.json(articles)
    }

app.get("/articles",getAllArticles)

//////////////////////////////////////////////////

const getArticlesByAuthor =  (req, res) => {
    // query parameters way: "/articles/search_1?author=Jouza"
    const author = req.query.author

    const arr = articles.filter((element,index)=>{

        return author === element.author
    })
    res.status(200)
    res.json(arr)

      }
app.get("/articles/search_1", getArticlesByAuthor);

////////////////////////////

const getAnArticleById = (req,res)=>{
    const id = req.query.id
    const found = articles.find((element,index) => {
        return element.id === parseInt(id);
      });
    if (found) {
    console.log(found)
    res.status(200)
    res.json(found)
    }else{
        res.status(404)
    res.json("not found")
    }

}

app.get("/articles/search_2", getAnArticleById);








///////////////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });