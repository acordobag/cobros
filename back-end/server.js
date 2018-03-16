var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./api/config/database');
var connection = config.database;
//Se declaran todos los accesos de las rutas
connection.sync();

//Generate Tables

var Customer = require('./api/models/customer.model');
var Location = require('./api/models/location.model');
var Account = require('./api/models/account.model');
var Payment = require('./api/models/payment.model');
var PaymentTerm = require('./api/models/paymentTerm.model');

Customer.build();
Location.build();
Account.build();
Payment.build();
PaymentTerm.build();

var routes = require('./api/routes/routes')

module.exports = app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}, routes);

// Initialize the app.
var server = app.listen(process.env.PORT || 8000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "error": message });
}
