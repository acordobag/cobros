var config = require('../config/database');
var Sequelize = require('sequelize');
var connection = config.database;
var User = require('./user.model');
var Account = require('./account.model');

module.exports = Payment = connection.define('payment', {
    ammount: Sequelize.DOUBLE,
    approved: Sequelize.BOOLEAN,
    date: Sequelize.DATE
});

Payment.belongsTo(User);
Payment.belongsTo(Account);

connection.sync();