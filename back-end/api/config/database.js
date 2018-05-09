var Sequelize = require('sequelize');
var connection = new Sequelize("cobros", "adrian", "Castillo1097", {
  host: 'acordoba.dynu.com',
  port:'3366',
  dialect: 'mysql',
  define: { timestamps: false },
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
