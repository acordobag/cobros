
'use strict'
const fs = require('fs')
const path = require('path')

export default {
    enviroment: 'development',
    port: 8080,
    host: '',
    clientUrl: `http://localhost:8080`,
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
      database: 'cobros_v2',
      dialect: 'mysql',
      // timezone: 'America/Costa_Rica',
      logging: msg => {
        fs.appendFile(path.join(__dirname, '../db', 'log.log'), msg, (err) => {
          if (err) {
            return console.log(err)
          }
        })
      },
      define: { timestamps: false },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      operatorsAliases: false
    }
  }
  