var config = require('../config/database');
var Sequelize = require('sequelize');
var connection = config.database;

module.exports = User = connection.define('user', {
    name: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    token: Sequelize.STRING
});

connection.sync();