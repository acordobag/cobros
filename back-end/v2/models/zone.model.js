'use strict'

import db from '../db'
const { sequelize, Sequelize } = db

const model = () => {

    const Zone = sequelize.define('zone', {
        name: Sequelize.STRING
    })
    return Zone
}

const Model = model()
export default Model