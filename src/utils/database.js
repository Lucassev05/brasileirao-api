const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

client
	.connect()
	.then(() => console.log('connected'))
	.catch((err) => console.log('connection error', err.stack));

module.exports = client;
