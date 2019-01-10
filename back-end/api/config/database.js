var Sequelize = require('sequelize');
var connection = new Sequelize("db", "user", "password", {
  host: 'url',
  port:'3306',
  dialect: 'mysql',
  define: { timestamps: false },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
module.exports = {
  'secret': 'jajaweonquepono',
  'database': connection
}
//Produccion
  //'database' : '''
//Desarrollo
  //'database' : ''
//var conn = mysql.createConnection({host: "{host_name}", user: "{your_username}", password: {your_password}, database: {your_database}, port: 3306, ssl:{ca:fs.readFileSync({ca-cert filename})}});
