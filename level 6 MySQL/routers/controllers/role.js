const db = require("../../db/db");

const createNewRole = (req, res) => {
	const { role } = req.body;

  const query = `INSERT INTO roles  (role) VALUES (?);`;
  const arr = [role];

  db.query(query, arr, (err, result) => {
    if (err) throw err;
    res.status(201).json(result);
  });
};

module.exports = {
	createNewRole,
};
