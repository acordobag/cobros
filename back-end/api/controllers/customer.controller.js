var Customer = require('../models/customer.model');
var Location = require('../models/location.model');
var Account = require('../models/account.model');
var PaymentTerm = require('../models/paymentTerm.model');
var config = require('../config/database');
var bcrypt = require('bcrypt');


module.exports.save = function (req, res) {

    var customer = {
        citizenId: req.body.citizenId,
        name: req.body.name,
        lastName: req.body.lastName,
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        locationId: req.body.location.id
    };

    Customer.create(customer)
        .then(function (pcustomer) {
            res.send(pcustomer);
        })
        .catch((err) => { res.status(500).send(err) });

};

module.exports.findAll = function (req, res) {
    Customer.findAll({ include: [Location, Account] }).then(function (pcustomers) {
        if (pcustomers) {
            res.send(pcustomers);
        } else if (!pcustomers) {
            res.send({ status: 400, msj: "NO HAY NINGUN REGISTRO" });
        }
    });
};

module.exports.findById = function (req, res) {
    Customer.findOne({
        where: {
            id: req.body.id
        },
        include: [Location, {
            model: Account,
            include: [PaymentTerm]
        }]
    }).then(function (pcustomers) {
        if (pcustomers) {
            res.send(pcustomers);
        } else if (!pcustomers) {
            res.send({ status: 400, msj: "NO HAY NINGUN REGISTRO" });
        }
    });
};