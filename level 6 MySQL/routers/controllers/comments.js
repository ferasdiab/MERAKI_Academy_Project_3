const db = require("../../db/db");
const createNewComment = (req, res) => {
  const article_id = req.params.id;
  const commenter_id = req.token.userId
let newId
  const { comment } = req.body;
  const query = `INSERT INTO comments (comment, article_id, commenter_id) VALUES(?,?,?)`;
  const data = [comment, article_id,commenter_id];
  db.query(query, data, (err, result) => {
    if (err) {
      res.send(err);
    }
	
    newId = result.insertId
    const query_2 = `SELECT * FROM comments WHERE comment_id=?;`
    const data=[newId]
    db.query(query_2,data,(err,response)=>{
      if (err) throw err;
      res.status(201).json(response)
    })
  });

};

module.exports = {
  createNewComment,
};
