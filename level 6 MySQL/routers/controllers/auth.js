const db = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const SECRET = "abc"

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email=?`
  const data = [email]
  let hashedPassword
  db.query(query,data,async(err,result)=>{
	if (err){
		res.send(err)
	}
  if (!result.length){
	  res.status(404).json("email not exsist")
	  return
  }

	const ver  =await  bcrypt.compare(password, result[0].password)
	if (!ver){
		res.status(403).json("wrong pass")
		return
	}
	const payload = {
		userId: result[0].id,
		role: result[0].role_id
	  };
	  console.log(" result.id", result[0].id);
	  console.log(" result.role_id", result[0].role_id);

	  const  options =  { expiresIn: '60m' }
	  const token = jwt.sign(payload, SECRET, options);
	  res.status(200).json({token});
	  return
});



};

module.exports = {
  login,
};
