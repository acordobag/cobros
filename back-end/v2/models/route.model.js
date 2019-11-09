'use strict'

import db from '../db'
const { sequelize, Sequelize } = db

const model = () => {
    const Route = sequelize.define('route', {
        name: Sequelize.STRING,
        state: Sequelize.INTEGER
    })
    return Route
}

const Model = model()
export default Model