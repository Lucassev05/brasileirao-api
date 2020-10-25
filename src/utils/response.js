// funçao de formatação de respostas
const response = (ctx, codigo, dados) => {
	const status = codigo >= 200 && codigo <= 399 ? 'sucesso' : 'erro';
	ctx.status = codigo;
	ctx.body = {
		status,
		dados,
	};
};

module.exports = { response };
