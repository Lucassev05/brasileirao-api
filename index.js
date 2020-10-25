const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./src/routes');

require('dotenv').config();

const PORT = process.env.PORT || 8000;
const server = new Koa();

server.use(bodyParser());
server.use(cors());
server.use(router.routes());

server.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
