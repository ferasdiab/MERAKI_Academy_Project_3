const express = require('express');
const {
  getAllArticles,
  getArticlesByAuthor,
  getAnArticleById,
  createNewArticle,
  updateAnArticleById,
  deleteArticleById,
  deleteArticlesByAuthor,
} = require('./../controllers/articles');

const authentication = require('./../middlewares/authentication');

const articlesRouter = express.Router();

articlesRouter.get('/', getAllArticles);
articlesRouter.get('/search_1', getArticlesByAuthor);
articlesRouter.get('/:id', getAnArticleById);
articlesRouter.post('/', authentication, createNewArticle);
articlesRouter.put('/:id', updateAnArticleById);
articlesRouter.delete('/:id', deleteArticleById);
articlesRouter.delete('/', deleteArticlesByAuthor);

module.exports = articlesRouter;
