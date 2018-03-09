var Location = require('../models/Location.model');
var Customer = require('../models/customer.model');

module.exports.save = function (req, res) {

    var location = {
        name: req.body.name
    }

    Location.create(location).then(function (location) {
        if (location) {
            res.send(location);
        } else if (!location) {
            res.send({ status: 400, msj: "NO SE REGISTRO!" });
        }

    });
};

module.exports.findAll = function (req, res) {
    Location.findAll({ include: [{ model: Customer, as: 'customers' }] }).then(function (Locations) {
        if (Locations) {
            res.send(Locations);
        } else if (!Locations) {
            res.send({ status: 400, msj: "NO HAY NINGUN REGISTRO" });
        }
    });
};
