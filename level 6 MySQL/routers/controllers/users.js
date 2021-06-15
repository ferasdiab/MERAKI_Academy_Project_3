const db = require("../../db/db");
const bcrypt = require("bcrypt");

const createNewAuthor = async (req, res) => {
  let { firstName, lastName, age, country, email, password, role_id } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  password = hashedPassword;
  const query = `INSERT INTO users  (firstName, lastName, age, country, email, password, role_id) VALUES (?,?,?,?,?,?,?);`
  const arr = [firstName, lastName, age, country, email, password, role_id];
  db.query(query,arr,(err,result)=>{
	  if (err){
		  res.send(err)
	  }
	res.status(201).json(result)
  });
}

module.exports = {
  createNewAuthor,
};
