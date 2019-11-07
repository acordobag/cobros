var PaymentTerm = require('../models/paymentTerm.model');
var config = require('../config/database');
var bcrypt = require('bcryptjs');

module.exports.save = function (req, res) {

    var paymentTerm = {
        name: req.body.name
    };

    PaymentTerm.create(paymentTerm).then(function (ppterm) {
        if (ppterm) {
            res.send(ppterm);
        } else if (!ppterm) {
            res.send({ status: 400, msj: "NO SE REGISTRO!" })
        }
    });
};

module.exports.findAll = function (req, res) {
    PaymentTerm.findAll().then(function (ppterms) {
        if (ppterms) {
            res.send(ppterms);
        } else if (!ppterms) {
            res.send({ status: 400, msj: "NO HAY NINGUN REGISTRO" });
        }
    });
};