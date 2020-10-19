const db = require('../utils/database');

const obterJogos = async () => {
	const result = await db.query('SELECT * FROM jogos LIMIT 5');
	console.log(result.rows);
};

obterJogos();
