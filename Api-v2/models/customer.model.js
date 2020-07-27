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
        reputation: Sequelize.STRING,
        fullName: {
            type: Sequelize.VIRTUAL,
            get() {
                return this.getDataValue('name') + ' ' + this.getDataValue('lastName')
            }
        }
    })

    return Customer
}

const Model = model()
export default Model
