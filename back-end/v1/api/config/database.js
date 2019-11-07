var Sequelize = require('sequelize');
var connection = new Sequelize("cobros", "mano", "Mano2019", {
  host: '35.194.81.30',
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