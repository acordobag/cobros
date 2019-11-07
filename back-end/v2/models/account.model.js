'use strict'

import db from '../db'
const { sequelize, Sequelize } = db

const model = () => {
    const Account = sequelize.define('account', {
        name: Sequelize.STRING,
        initialAmmount: Sequelize.DOUBLE,
        actualAmmount: Sequelize.DOUBLE,
        interestRate: Sequelize.DOUBLE,
        numberOfPayments: Sequelize.DOUBLE,
        charge: Sequelize.DOUBLE,
        alreadyPay: Sequelize.BOOLEAN,
    })
    return Account
}

const Model = model()
export default Model
