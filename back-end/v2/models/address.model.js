'use strict'

import db from '../db'
const { sequelize, Sequelize } = db

const model = () => {
    const Anddress = sequelize.define('address', {
        street: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        country: Sequelize.STRING,
        latitude: Sequelize.DOUBLE,
        longitude: Sequelize.DOUBLE,
        isPrefered: Sequelize.BOOLEAN
    })

    return Anddress
}

const Model = model()
export default Model
