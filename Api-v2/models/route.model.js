'use strict'

import db from '../db'
import User from './user.model'
const { sequelize, Sequelize } = db
const Op = Sequelize.Op

const model = () => {
    const Route = sequelize.define('route', {
        name: Sequelize.STRING,
        status: {
            type: Sequelize.ENUM,
            values: [
                'active', //Activa
                'complete', //Completada
            ],
            defaultValue: 'active'
        },
        desStatus: {
            type: Sequelize.VIRTUAL,
            get() {
                switch (this.getDataValue('status')) {
                    case 'active':
                        return 'Activa'
                    case 'complete':
                        return 'Finalizada'
                }
            }
        }
    })
    return Route
}

const Model = model()

Model.findAllActives = () => {
    return Model.findAll({
        where: {
            status: {
                [Op.in]: ['active']
            }
        },
        include: [
            { model: User, attributes: { exclude: ['password'] }, as: 'driver' }
        ]
    })
}


export default Model