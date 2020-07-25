'use strict'

import db from '../db'
const { sequelize, Sequelize } = db

const model = () => {
    const Customer = sequelize.define('customer', {
        citizenId: Sequelize.STRING,
        name: Sequelize.STRING,
        lastName: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        fullName: Sequelize.STRING
    })

    return Customer
}

const Model = model()
export default Model
