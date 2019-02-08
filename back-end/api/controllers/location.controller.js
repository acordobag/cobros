var Location = require('../models/Location.model');
var Customer = require('../models/customer.model');

module.exports.save = (req, res) => {
    var location = {
        name: req.body.name
    }
    if (!location.name) { throw new Error('No se puede insertar un valor nulo'); }
    Location.create(location)
        .then((location) => { res.send(location); })

};

module.exports.findAll = function (req, res) {
    Location.findAll({ include: [{ model: Customer, as: 'customers' }] })
        .then((plocations) => {
            res.send(plocations ? plocations : []);
        })
        .catch((err) => {  throw err });
};
