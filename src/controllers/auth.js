// autenticar
const { response } = require('../utils/response');
const { getUsuario } = require('../repositories/auth');
const { check } = require('../utils/password');

const autenticar = async (ctx) => {
	const requisicao = ctx.request.body;
	if (requisicao.email !== undefined && requisicao.password !== undefined) {
		const usuario = await getUsuario(requisicao);
		if (usuario !== undefined) {
			const senhaCorreta = await check(
				requisicao.password,
				usuario.senha
			);
			if (senhaCorreta) {
				return response(ctx, 200, { mensagem: 'Sucess' });
			}
		}
		return response(ctx, 400, { mensagem: 'Email ou Senha invalido(s)' });
	}
	return response(ctx, 400, { mensagem: 'Pedido mal formatado' });
};

module.exports = { autenticar };
