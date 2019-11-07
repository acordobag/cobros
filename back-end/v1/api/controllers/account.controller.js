var Account = require('../models/account.model');
var Payment = require('../models/payment.model');
var Customer = require('../models/customer.model');
var Location = require('../models/location.model');
var User = require('../models/user.model');
var PaymentTerm = require('../models/paymentTerm.model');
var config = require('../config/database');
var bcrypt = require('bcryptjs');

module.exports.save = (req, res, next) => {

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

    Account.create(account)
        .then((paccount) => {
            res.send(paccount);
        })
        .catch(next);
};

module.exports.findAll = (req, res, next) => {
    Account.findAll({ include: [PaymentTerm] })
        .then(function (paccounts) {
            res.send(paccounts);
        });
};

module.exports.findById = (req, res, next) => {
    Account.find({
        where: { id: req.body.id },
        include: [{ model: Payment, include: [User] }]
    })
        .then((paccounts) => {
            res.send(paccounts);
        })
        .catch(next)
};

module.exports.addPayment = (req, res, next) => {

    var payment = {
        ammount: req.body.ammount,
        approved: req.body.approved,
        date: req.body.date,
        userId: req.body.user.id,
        accountId: req.body.account.id
    }

    Payment.create(payment)
        .then((ppayment) => {
            res.send(ppayment);
        })
        .catch(next);
};

module.exports.findAllPendingPayments = (req, res, next) => {
    Payment.findAll({
        where: { approved: false },
        include: [User, Account]
    }).then((payments) => {
        res.send(payments);
    });
}

module.exports.approvePayment = (req, res, next) => {
    Payment.find({ where: { id: req.body.id } })
        .then((ppayment) => { return ppayment.updateAttributes({ approved: true }) })
        .then((ppayment) => res.send({ status: 200, ppayment }))
        .catch(next);
}
module.exports.approveListOfPayments = (req, res, next) => {
    var payments = req.body.payments;
    payments.forEach((payment) => {
        Payment.find({ where: { id: payment.id } })
            .then((ppayment) => { return ppayment.updateAttributes({ approved: true }) })
            .then((ppayments) => res.send(ppayments))
            .catch(next)
    });
}

module.exports.findAccountPayments = (req, res, next) => {
    Payment.find({ where: { accountId: req.body.id } })
        .then((ppayments) => {
            res.send(ppayments);
        })
        .catch(next);
};

module.exports.findAllPaymentsTerms = (req, res, next) => {
    PaymentTerm.findAll()
        .then((ppterms) => {
            res.send(ppterms);
        });
};