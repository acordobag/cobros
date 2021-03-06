var config = require('../config/database');
var Sequelize = require('sequelize');
var connection = config.database;
var Customer = require('./customer.model');

var PaymentTerm = require('./paymentTerm.model');

module.exports = Account = connection.define('account', {
    name: Sequelize.STRING,
    initialAmmount: Sequelize.DOUBLE,
    actualAmmount: Sequelize.DOUBLE,
    interestRate: Sequelize.DOUBLE,
    numberOfPayments: Sequelize.DOUBLE,
    charge: Sequelize.DOUBLE,
    alreadyPay: Sequelize.BOOLEAN,
});

var Payment = require('./payment.model');
Account.hasMany(Payment);
Account.belongsTo(PaymentTerm);

connection.sync();