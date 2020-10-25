const db = require('../utils/database');

const jogosPorRodada = async (rodada) => {
	const query = `SELECT jogos.id, time_casa.nome time_casa, time_casa.brasao brasao_casa, jogos.gols_casa, time_visitante.nome time_visitante, time_visitante.brasao brasao_visitante, jogos.gols_visitante
	FROM jogos 
	INNER JOIN times as time_casa ON id_time_casa = time_casa.id
	INNER JOIN times as time_visitante ON id_time_visitante = time_visitante.id
	where jogos.rodada = ${rodada}
	order by jogos.id`;

	const result = await db.query(query);
	return result.rows;
};

const editarPlacarDeJogo = async (objeto) => {
	const query = `WITH updated as(
		UPDATE jogos SET gols_casa = ${objeto.golsCasa}, gols_visitante = ${objeto.golsVisitante}
	FROM
	  ( SELECT * FROM jogos
		WHERE jogos.id = ${objeto.id}
		ORDER BY id
		FOR UPDATE
	  ) jogos1
	  JOIN times as time_casa ON jogos1.id_time_casa = time_casa.id
	  JOIN times as time_visitante ON jogos1.id_time_visitante = time_visitante.id
	WHERE jogos.id = ${objeto.id}
	RETURNING jogos.id, time_casa.nome as time_casa, jogos.gols_casa, time_visitante.nome as time_visitante ,jogos.gols_visitante) SELECT * FROM updated`;

	const result = await db.query(query);
	return result.rows.shift();
};

const getJogos = async () => {
	const query = `SELECT *
	FROM jogos
	ORDER BY id`;

	const result = await db.query(query);
	return result.rows;
};

module.exports = { jogosPorRodada, editarPlacarDeJogo, getJogos };
