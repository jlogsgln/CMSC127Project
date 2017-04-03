const mysql = require('mysql');

const obj = {
	host: 'localhost',
	user: 'root',
	password: 'johnlouismatalino',
	database: 'project'
};

module.exports = mysql.createConnection(obj);
