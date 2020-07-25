'use strict'

import db from '../db'
const {sequelize, Sequelize} = db
const model = () => {
    const PaymentTerm = sequelize.define('paymentTerm', {
        name: Sequelize.STRING,
    })
    return PaymentTerm
}

const Model = model()
export default Model