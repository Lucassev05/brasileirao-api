/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const { response } = require('../utils/response');

require('dotenv').config();

const verify = async (ctx, next) => {
	try {
		const [bearer, token] = ctx.headers.authorization.split(' ');
		const verification = await jwt.verify(token, process.env.JWT_SECRET);

		ctx.state.userId = verification.id;
		ctx.state.email = verification.email;
	} catch (error) {
		return response(ctx, 403, {
			mensagem: 'Ação proibida',
		});
	}

	return next();
};

module.exports = { verify };
