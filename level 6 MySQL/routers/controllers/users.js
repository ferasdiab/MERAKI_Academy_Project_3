const db = require("../../db/db");
const bcrypt = require("bcrypt");

const createNewAuthor = async (req, res) => {
  let { firstName, lastName, age, country, email, password, role_id } = req.body;
  let newId
  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;
  const query = `INSERT INTO users  (firstName, lastName, age, country, email, password, role_id) VALUES (?,?,?,?,?,?,?);`
  const arr = [firstName, lastName, age, country, email, password, role_id];
  db.query(query,arr,(err,result)=>{
    if (err) {
      res.send(err);
    }
	  newId = result.insertId
    const query_2 = `SELECT * FROM users WHERE user_id=?;`
    const data=[newId]
    db.query(query_2,data,(err,response)=>{
      if (err) {
        res.send(err);
      }
      res.status(201).json(response)
    })
	
  });
}

module.exports = {
  createNewAuthor,
};
