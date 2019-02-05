var Sequelize = require('sequelize');
var connection = new Sequelize("cobros", "acordoba", "acordoba", {
  host: '40.122.170.216',
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