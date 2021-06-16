const db = require("../../db/db");

const createNewRole = async(req, res) => {
  const { role } = req.body;

  const query = `INSERT INTO roles  (role) VALUES (?);`;
  const arr = [role];
  let newId
  db.query(query, arr, (err, result) => {
    if (err) throw err;
    newId = result.insertId
    const query_2 = `SELECT * FROM roles WHERE role_id=?;`
    const data=[newId]
    db.query(query_2,data,(err,response)=>{
      if (err) throw err;
      res.status(201).json(response[0])
    })
  });

  // const { role } = req.body;

  // const query = `INSERT INTO roles  (role) VALUES (?);`;
  // const arr = [role];
  // let newId;
  // const data = await db.query(query,arr)
  // console.log("data",data);


};

module.exports = {
  createNewRole,
};
