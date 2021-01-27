'use strict'

import db from '../db'
const { sequelize, Sequelize } = db

const model = () => {
    const RouteDetail = sequelize.define('routeDetail', {
        state: Sequelize.INTEGER, //Crear un enum con los estados 0 creado, 1 Pagado, 2 No pago
        comment: Sequelize.STRING
    })

    return RouteDetail
}

const Model = model()
export default Model