var Customer = require('../models/customer.model');
var Location = require('../models/location.model');
var jwt = require('jwt-simple');
var config = require('../config/database');
var bcrypt = require('bcrypt');

module.exports.save = function (req, res) {

    var customer = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        locationId: req.body.location.id
    };

    Customer.create(customer).then(function (pcustomer) {
        if (pcustomer) {
            res.send(customer);
        } else if (!pcustomer) {
            res.send({ status: 400, msj: "NO SE REGISTRO!" })
        }
    });

};

module.exports.findAll = function (req, res) {
    Customer.findAll({ include: [Location] }).then(function (locations) {
        if (locations) {
            res.send(locations);
        } else if (!locations) {
            res.send({ status: 400, msj: "NO HAY NINGUN REGISTRO" });
        }
    });
};