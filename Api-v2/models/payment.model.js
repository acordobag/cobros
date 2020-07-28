'use strict'

import Account from './account.model'
import Customer from './customer.model'
import User from './user.model'
import db from '../db'
const { sequelize, Sequelize } = db
const Op = Sequelize.Op

const model = () => {

    const Payment = sequelize.define('payment', {
        ammount: Sequelize.DOUBLE,
        comment: Sequelize.STRING,
        status: {
            type: Sequelize.ENUM,
            values: [
                'pending', //Pending
                'paid', //Paid
                'approved', //Approved
                'snooze'  //Pospuesto
            ],
            defaultValue: 'pending'
        },
        createDate: Sequelize.DATE,
        maxPaidDate: Sequelize.DATE,
        realPaidDate: Sequelize.DATE,
        desStatus: {
            type: Sequelize.VIRTUAL,
            get() {
                switch (this.getDataValue('status')) {
                    case 'pending':
                        return 'Pendiente'
                    case 'paid':
                        return 'Pagado'
                    case 'approved':
                        return 'Aprobado'
                    case 'snooze':
                        return 'Pospuesto'
                }
            }
        }
    })

    return Payment
}

const Model = model()

function findById(id, det = false) {
    return Model.findOne({
        where: {
            id: id
        },
        include: [
            { model: User, attributes: { exclude: ['password'] } }
        ]
    })
    
}

function findPendings() {
    return Model.findAll({
        where: {
            status: {
                [Op.in]: ['paid']
            }
        },
        include: [
            { model: User, attributes: { exclude: ['password'] } },
            { model: Account, include: [Customer] }
        ]
    })
}

Model.findById = findById
Model.findPendings = findPendings

export default Model