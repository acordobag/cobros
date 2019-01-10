var Route = require('../models/route.model');
var Payment = require('../models/payment.model');
var Customer = require('../models/customer.model');
var Location = require('../models/location.model');
var User = require('../models/user.model');
var PaymentTerm = require('../models/paymentTerm.model');
var config = require('../config/database');
var bcrypt = require('bcrypt');

module.exports.createRoute = function (req, res) {

    var route = {
        locations: req.body.locations,
        name : req.body.name,
        driverId: req.body.driver.id,
        createdById : req.body.user.id,
        state: req.body.state
    };

    Route.create(account).then(function (paccount) {
        if (paccount) {
            res.send(paccount);
        } else if (!paccount) {
            res.send({ status: 400, msj: "NO SE REGISTRO!" })
        }
    });

};

module.exports.findAll = function (req, res) {
    Route.findAll({ include: [PaymentTerm] }).then(function (accounts) {
        if (accounts) {
            res.send(accounts);
        } else if (!accounts) {
            res.send({ status: 400, msj: "NO HAY NINGUN REGISTRO" });
        }
    });
};

module.exports.findById = function (req, res) {
    Route.find({
        where: {
            id: req.body.id
        },
        include: [{model: Payment, include: [User]}]
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
        accountId: req.body.account.id
    }

    Payment.create(payment).then(function (ppayment) {
        if (ppayment) {
            res.send(ppayment);
        } else if (!ppayment) {
            res.send({ status: 400, msj: "NO SE REGISTRO" });
        }
    });
};

module.exports.findAllPendingPayments = function (req, res) {
    Payment.findAll({
        where: { approved: false },
        include: [User, Route]
    }).then(function (payments) {
        if (payments) {
            res.send(payments);
        } else if (!payments) {
            res.send({ status: 400, msj: "NO HAY NINGUN REGISTRO" });
        }
    })
}

module.exports.approvePayment = function (req, res) {
    var payment = {
        id: req.body.id
    }

    Payment.find({
        where: { id: payment.id }
    }).then(function (ppayment) {
        ppayment.updateAttributes({
            approved: true
        });
        Route.find({
            where: { id: ppayment.accountId }
        }).then(function (paccount) {
            paccount.updateAttributes({
                actualAmmount: paccount.actualAmmount - ppayment.ammount
            });
            res.send({ status: 200, ppayment });
        })
    })
}

module.exports.approveListOfPayments = function (req, res) {
    var payments = req.body.payments;
    try {
        payments.forEach(function (payment) {
            Payment.find({
                where: { id: payment.id }
            }).then(function (ppayment) {
                ppayment.updateAttributes({
                    approved: true
                });
                Route.find({
                    where: { id: ppayment.accountId }
                }).then(function (paccount) {
                    paccount.updateAttributes({
                        actualAmmount: paccount.actualAmmount - ppayment.ammount
                    });
                })
            })
        });
        res.send({ status: 200, ppayment });
    } catch (error) {
        res.send({ status: 400, msg: 'No se pudo concluir' });
    }

}

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