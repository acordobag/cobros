var config = require('../config/database');
var Sequelize = require('sequelize');
var connection = config.database;
var Account = require('./account.model');

module.exports = PaymentTerm = connection.define('paymentTerm', {
    name: Sequelize.STRING,
});

connection.sync();