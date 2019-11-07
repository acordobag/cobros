var config = require('../config/database');
var Sequelize = require('sequelize');
var connection = config.database;
var User = require('./user.model');
var Customer = require('./user.model');

module.exports = Route = connection.define('route', {
    name: Sequelize.STRING,
    state: Sequelize.INTEGER
});

Route.belongsTo(User, {as: 'driver'});
Route.belongsTo(User, {as: 'createdBy'});

module.exports = RouteDetail = connection.define('routeDetail', {
    state: Sequelize.INTEGER, //Crear un enum con los estados
    commtent: Sequelize.STRING  
});

RouteDetail.belongsTo(Customer);
RouteDetail.belongsTo(Route)

connection.sync();