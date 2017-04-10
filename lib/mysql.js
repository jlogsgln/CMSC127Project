const mysql = require('mysql');

const obj = {
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'project'
};

module.exports = mysql.createConnection(obj);
