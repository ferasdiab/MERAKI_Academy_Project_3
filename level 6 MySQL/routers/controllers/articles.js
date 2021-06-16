const articlesModel = require("./../../db/models/articles");
const db = require("../../db/db");

const getAllArticles = (req, res) => {
  const query = `SELECT * FROM articles WHERE is_deleted=0;`;
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(result);
  });
};

const getArticlesByAuthor = (req, res) => {
  const author_id = req.query.author;
  const query = `SELECT * FROM articles WHERE author_id=? AND is_deleted =0;`;
  const data = [author_id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(result);
  });
};

const getAnArticleById = (req, res) => {
  const _id = req.params.id;

  if (!_id) return res.status(404).json("not found");
  const query = `SELECT * FROM articles
  INNER JOIN users ON articles.author_id = users.user_id WHERE  articles.article_id=? AND articles.is_deleted=0  ;`;
  const data = [_id];
  db.query(query, data,(err, result) => {
    if (err) {
      res.send(err);
    }
	console.log(result);
    res.status(200).json(result);
  });
};

const createNewArticle = (req, res) => {
  const { title, description, author_id } = req.body;
  const query = `INSERT INTO articles (title, description, author_id) VALUES(?,?,?)`;
  const data = [title, description, author_id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.status(201).json(result);
  });
};

const updateAnArticleById = (req, res) => {
  const { title, description, author_id,is_deleted } = req.body;
  const id = req.params.id;
  const query = `UPDATE articles SET title = ? , description = ?,author_id=? ,is_deleted=? WHERE article_id = ?`;
  const data = [title, description, author_id,is_deleted, id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(result);
  });
};

const deleteArticleById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE articles SET is_deleted=1  WHERE article_id = ?`;
  const data = [id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(result);
  });
};

const deleteArticlesByAuthor = (req, res) => {
  const author_id = req.body.author_id;

  const query = `UPDATE articles SET is_deleted=1  WHERE author_id = ?`;
  const data = [author_id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(result);
  });
};

module.exports = {
  getAllArticles,
  getArticlesByAuthor,
  getAnArticleById,
  createNewArticle,
  updateAnArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
};
