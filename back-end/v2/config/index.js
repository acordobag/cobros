
'use strict'
export default {
    enviroment: 'development',
    port: port || 'localhost',
    host: ip,
    clientUrl: `http://${ip}:8080`,
    authentication: {
      jwtSecret: 'CAca1978'
    },
    paypalSettings: {
      clientId: '',
      secret: '',
      enviroment: ''
    },
    mailSettings: {
      user: '',
      pass: ''
    },
    smsSettings: {
      key: '',
      secret: ''
    },
    moneyGram: {
      endpoint: '',
      user: '',
      password: ''
    },
    payments: {
      key: "",
      secret: ""
    },
    dbSettings: {
      host: '35.194.81.30',
      username: 'mano',
      password: 'Mano2019',
      database: 'cobros',
      dialect: 'mysql',
      // timezone: 'America/Costa_Rica',
      logging: msg => {
        fs.appendFile(path.join(__dirname, '../db', 'log.log'), msg, (err) => {
          if (err) {
            return console.log(err)
          }
        })
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      operatorsAliases: false
    }
  }
  