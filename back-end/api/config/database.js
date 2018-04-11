var Sequelize = require('sequelize');
var connection = new Sequelize("arley", "root", "CAca1978", {
  host: '159.65.228.171',
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
