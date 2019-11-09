'use strict'

import db from '../db'
const {sequelize, Sequelize} = db
const model = () => {
    const Payment = sequelize.define('payment', {
        ammount: Sequelize.DOUBLE,
        approved: Sequelize.BOOLEAN,
        date: Sequelize.DATE
    })
    return Payment
}

const Model = model()
export default Model