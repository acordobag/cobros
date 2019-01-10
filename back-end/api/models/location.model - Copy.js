var config = require('../config/database');
var Sequelize = require('sequelize');
var connection = config.database;
var Customer = require('./customer.model');

module.exports = Location = connection.define('location', {
  name: Sequelize.STRING,
});

Location.hasMany(Customer,{ as: "customers" });

connection.sync();