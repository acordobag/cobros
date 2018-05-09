var config = require('../config/database');
var Sequelize = require('sequelize');
var connection = config.database;
var Customer = require('./customer.model');
var Payment = require('./payment.model');
var PaymentTerm = require('./paymentTerm.model');

module.exports = Account = connection.define('account', {
    name: Sequelize.STRING,
    initialAmmount: Sequelize.DOUBLE,
    actualAmmount: Sequelize.DOUBLE,
    interestRate: Sequelize.DOUBLE,
    numberOfPayments: Sequelize.DOUBLE,
    charge: Sequelize.DOUBLE,
    already_pay: Sequelize.BOOLEAN,
});


Account.hasMany(Payment);
Account.belongsTo(PaymentTerm);

connection.sync();