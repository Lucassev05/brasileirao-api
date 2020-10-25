const Router = require('koa-router');
const {
	getClassificacao,
	getRodada,
	editJogos,
} = require('./controllers/jogos');
const { autenticar } = require('./controllers/auth');
const { verify } = require('./middlewares/session');

const router = new Router();

/**
 * Definição de rotas
 */

router
	.get('/jogos/:rodada', getRodada)
	.post('/jogos', verify, editJogos)
	.get('/classificacao', getClassificacao)
	.post('/auth', autenticar);

module.exports = router;
