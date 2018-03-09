var config = require('../config/database');
var Sequelize = require('sequelize');
var connection = config.database;

module.exports = Customer = connection.define('customer', {
    citizenId: Sequelize.STRING,
    name: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING
});

var Location = require('./location.model');
Customer.belongsTo(Location);

connection.sync();