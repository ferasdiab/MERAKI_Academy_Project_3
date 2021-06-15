const commentsModel = require('./../../db/models/comments');

const createNewComment = (req, res) => {
	const articleId = req.params.id;

	const { comment, commenter } = req.body;

	const newComment = new commentsModel({
		comment,
		articleId,
		commenter,
	});

	newComment
		.save()
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => {
			res.send(err);
		});
};

module.exports = {
	createNewComment,
};
