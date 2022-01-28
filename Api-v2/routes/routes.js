import express from 'express'

import CustomerController from '../controllers/customer.controller'
import RouteController from '../controllers/route.controller'
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
    .get((req, res, next) => {
        CustomerController.findAll(req, res, next);
    })
    .post((req, res, next) => {
        CustomerController.save(req, res, next);
    });

router.route('/customer/:id')
    .get((req, res, next) => {
        CustomerController.findById(req, res, next);
    })
// router.route('/zone')
//     .get((req, res, next)=> {
//         ZoneController.findAll(req, res, next);
//     })
//     .post((req, res, next)=> {
//         ZoneController.save(req, res, next);
//     });

router.route('/user')
    .get((req, res, next) => {
        UserController.findAll(req, res, next);
    })
    .post((req, res, next) => {
        UserController.save(req, res, next);
    });

router.route('/user/:id')
    .get((req, res, next) => {
        UserController.findById(req, res, next);
    })

router.route('/auth')
    .post((req, res, next) => {
        UserController.authenticate(req, res, next);
    })

router.route('/account')
    .post((req, res, next) => {
        AccountController.save(req, res, next);
    })
    .get((req, res, next) => {
        AccountController.findAll(req, res, next);
    })

router.route('/payment')
    .post((req, res, next) => {
        AccountController.addPayment(req, res, next);
    })
    .get((req, res, next) => {
        AccountController.findAllPendingPayments(req, res, next);
    })
router.route('/approveOnePayment')
    .post((req, res, next) => {
        AccountController.approvePayment(req, res, next);
    })
router.route('/approveListOfPayment')
    .post((req, res, next) => {
        AccountController.approveListOfPayments(req, res, next);
    })

router.route('/account/:id')
    .get((req, res, next) => {
        AccountController.findById(req, res, next);
    })

router.route('/paymentTerm')
    .post((req, res, next) => {
        PaymentTermController.save(req, res, next);
    })
    .get((req, res, next) => {
        PaymentTermController.findAll(req, res, next);
    })

router.route('/address')
    .post((req, res, next) => {
        AddressController.save(req, res, next);
    })

router.route('/routes')
    .post((req, res, next) => {
        RouteController.createRoute(req, res, next);
    })
    .get((req, res, next) => {
        RouteController.findAllActives(req, res, next);
    })

module.exports = router;
