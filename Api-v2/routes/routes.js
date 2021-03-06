import express from 'express'

import CustomerController from '../controllers/customer.controller'
import ZoneController from '../controllers/zone.controller'
import UserController from '../controllers/user.controller'
import AccountController from '../controllers/account.controller'
import PaymentTermController from '../controllers/paymentTerm.controller'
import AddressController from '../controllers/address.controller'

var router = express.Router()

router.param('id', function (req, res, next, id) {
    req.body.id = id;
    next();
});

//Place routes

router.route('/customer')
    .get(function (req, res, next) {
        CustomerController.findAll(req, res, next);
    })
    .post(function (req, res, next) {
        CustomerController.save(req, res, next);
    });

router.route('/customer/:id')
    .get(function (req, res, next) {
        CustomerController.findById(req, res, next);
    })
router.route('/zone')
    .get(function (req, res, next) {
        ZoneController.findAll(req, res, next);
    })
    .post(function (req, res, next) {
        ZoneController.save(req, res, next);
    });

router.route('/user')
    .get(function (req, res, next) {
        UserController.findAll(req, res, next);
    })
    .post(function (req, res, next) {
        UserController.save(req, res, next);
    });

router.route('/user/:id')
    .get(function (req, res, next) {
        UserController.findById(req, res, next);
    })

router.route('/auth')
    .post(function (req, res, next) {
        UserController.authenticate(req, res, next);
    })

router.route('/account')
    .post(function (req, res, next) {
        AccountController.save(req, res, next);
    })
    .get(function (req, res, next) {
        AccountController.findAll(req, res, next);
    })

router.route('/payment')
    .post(function (req, res, next) {
        AccountController.addPayment(req, res, next);
    })
    .get(function (req, res, next) {
        AccountController.findAllPendingPayments(req, res, next);
    })
router.route('/approveOnePayment')
    .post(function (req, res, next) {
        AccountController.approvePayment(req, res, next);
    })
router.route('/approveListOfPayment')
    .post(function (req, res, next) {
        AccountController.approveListOfPayments(req, res, next);
    })

router.route('/account/:id')
    .get(function (req, res, next) {
        AccountController.findById(req, res, next);
    })

router.route('/paymentTerm')
    .post(function (req, res, next) {
        PaymentTermController.save(req, res, next);
    })
    .get(function (req, res, next) {
        PaymentTermController.findAll(req, res, next);
    })

router.route('/address')
    .post(function (req, res, next) {
        AddressController.save(req, res, next);
    })

module.exports = router;
