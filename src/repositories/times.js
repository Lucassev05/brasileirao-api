const db = require('../utils/database');

const getTimes = async () => {
	const query = `SELECT * FROM times`;

	const result = await db.query(query);
	return result.rows;
};

module.exports = { getTimes };
