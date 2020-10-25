const db = require('../utils/database');

const getUsuario = async (ctx) => {
	const query = `
	SELECT * 
	FROM users
	WHERE email ilike '${ctx.email}'`;

	const result = await db.query(query);
	return result.rows.shift();
};

module.exports = { getUsuario };
