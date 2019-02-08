var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./api/config/database');
var connection = config.database;
//Se declaran todos los accesos de las rutas
connection.sync();
//Generate Tables

var routes = require('./api/routes/routes')

module.exports = app = express();

app.use(bodyParser.json());
app.use('/api', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}, routes);

app.use((error, req, res, next) => {
  console.log("ERROR: " + error);
  res.status(500);
  res.send({ error: error.message });
});

// Initialize the app.
var server = app.listen(process.env.PORT || 8000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(error, res, req, next) {
  console.log("ERROR: " + error);
  res.status(500).json({ "error": error });
}
