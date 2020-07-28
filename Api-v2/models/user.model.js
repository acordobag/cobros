'use strict'

import db from '../db'
const { sequelize, Sequelize } = db

const model = () => {
    const User = sequelize.define('user', {
        name: Sequelize.STRING,
        lastName: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        isDriver: Sequelize.BOOLEAN,
        token: Sequelize.VIRTUAL
    })

    return User
}

const Model = model()
export default Model