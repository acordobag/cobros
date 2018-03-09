var express = require('express');
var router = express.Router();
var CustomerController = require('../controllers/customer.controller');
var LocationController = require('../controllers/location.controller');

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

router.route('/location')
    .get(function (req, res) {
        LocationController.findAll(req, res);
    })
    .post(function (req, res) {
        LocationController.save(req, res)
    });
module.exports = router;
