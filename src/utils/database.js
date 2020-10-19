const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	port: process.env.DB_PORT,
	password: process.env.DB_PW,
	database: process.env.DB_NAME,
	ssl: {
		rejectUnauthorized: false,
	},
});

client
	.connect()
	.then(() => console.log('connected'))
	.catch((err) => console.log('connection error', err.stack));

module.exports = client;
