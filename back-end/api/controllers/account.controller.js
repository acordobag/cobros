var Account = require('../models/account.model');
var Payment = require('../models/payment.model');
var Customer = require('../models/customer.model');
var Location = require('../models/location.model');
var PaymentTerm = require('../models/paymentTerm.model');
var config = require('../config/database');
var bcrypt = require('bcrypt');

module.exports.save = function (req, res) {

    var account = {
        name: req.body.name,
        initialAmmount: req.body.initialAmmount,
        actualAmmount: req.body.actualAmmount,
        interestRate: req.body.interestRate,
        numberOfPayments: req.body.numberOfPayments,
        charge: req.body.charge,
        paymentTermId: req.body.paymentTerm.id,
        customerId: req.body.customer.id,
        already_pay: req.body.already_pay
    };

    Account.create(account).then(function (paccount) {
        if (paccount) {
            res.send(paccount);
        } else if (!paccount) {
            res.send({ status: 400, msj: "NO SE REGISTRO!" })
        }
    });

};

module.exports.findAll = function (req, res) {
    Account.findAll({ include: [PaymentTerm] }).then(function (accounts) {
        if (accounts) {
            res.send(accounts);
        } else if (!accounts) {
            res.send({ status: 400, msj: "NO HAY NINGUN REGISTRO" });
        }
    });
};

module.exports.findById = function (req, res) {
    Account.find({
        where: {
            id: req.body.id
        }
    }).then(function (accounts) {
        if (accounts) {
            res.send(accounts);
        } else if (!accounts) {
            res.send({ status: 400, msj: "NO HAY NINGUN REGISTRO" });
        }
    });
};

module.exports.addPayment = function (req, res) {

    var payment = {
        ammount: req.body.ammount,
        approved: req.body.approved,
        date: req.body.date,
        userId: req.body.user.id,
        accountId: req.body.accountId
    }

    Payment.create(payment).then(function (ppayment) {
        if (ppayment) {
            Account.find({
                where: {
                    id: payment.accountId
                }
            }).then(function (account) {
                if (account) {
                    account.updateAttributes({
                        actualAmmount: account.actualAmmount - payment.ammount
                    }).then(function () { res.send(ppayment); })

                }
            });

        } else if (!ppayment) {
            res.send({ status: 400, msj: "NO SE REGISTRO" });
        }
    });
};

module.exports.findAccountPayments = function (req, res) {
    Payment.find({
        where: {
            accountId: req.body.id
        }
    }).then(function (ppayments) {
        if (ppayments) {
            res.send(ppayments);
        } else if (!ppayments) {
            res.send({ status: 400, msj: "NO HAY NINGUN REGISTRO" });
        }
    });
};

module.exports.findAllPaymentsTerms = function (req, res) {
    PaymentTerm.findAll().then(function (ppterms) {
        if (ppterms) {
            res.send(ppterms);
        } else if (!ppterms) {
            res.send({ status: 400, msj: "NO HAY NINGUN REGISTRO" });
        }
    });
};