var express = require('express');
var router = express.Router();
var CustomerController = require('../controllers/customer.controller');
var LocationController = require('../controllers/location.controller');
var UserController = require('../controllers/user.controller');
var AccountController = require('../controllers/account.controller');
var PaymentTermController = require('../controllers/paymentTerm.controller');

router.param('id', function (req, res, next, id) {
    req.body.id = id;
    next();
});

//Place routes

router.route('/customer')
    .get(function (req, res) {
        CustomerController.findAll(req, res);
    })
    .post(function (req, res) {
        CustomerController.save(req, res)
    });

router.route('/customer/:id')
    .get(function (req, res) {
        CustomerController.findById(req, res);
    })
router.route('/location')
    .get(function (req, res) {
        LocationController.findAll(req, res);
    })
    .post(function (req, res) {
        LocationController.save(req, res)
    });

router.route('/user')
    .get(function (req, res) {
        UserController.findAll(req, res);
    })
    .post(function (req, res) {
        UserController.save(req, res)
    });

router.route('/user/:id')
    .get(function (req, res) {
        UserController.findById(req, res);
    })

router.route('/auth')
    .post(function (req, res) {
        UserController.authenticate(req, res)
    })

router.route('/account')
    .post(function (req, res) {
        AccountController.save(req, res)
    })
    .get(function (req, res) {
        AccountController.findAll(req, res);
    })

router.route('/payment')
    .post(function (req, res) {
        AccountController.addPayment(req, res)
    })
    .get(function (req, res) {
        AccountController.findAllPendingPayments(req, res);
    })
router.route('/approveOnePayment')
    .post(function (req, res) {
        AccountController.approvePayment(req, res)
    })
router.route('/approveListOfPayment')
    .post(function (req, res) {
        AccountController.approveListOfPayments(req, res)
    })

router.route('/account/:id')
    .get(function (req, res) {
        AccountController.findById(req, res);
    })

router.route('/paymentTerm')
    .post(function (req, res) {
        PaymentTermController.save(req, res)
    })
    .get(function (req, res) {
        PaymentTermController.findAll(req, res);
    })

module.exports = router;
