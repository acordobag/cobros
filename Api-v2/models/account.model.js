'use strict'

import Payment from './payment.model'
import User from './user.model'
import PaymentTerm from './paymentTerm.model'
import db from '../db'
const { sequelize, Sequelize } = db
const Op = Sequelize.Op

const model = () => {
    const Account = sequelize.define('account', {
        name: Sequelize.STRING,
        initialAmmount: Sequelize.DOUBLE,
        actualAmmount: Sequelize.DOUBLE,
        interestRate: Sequelize.DOUBLE,
        numberOfPayments: Sequelize.DOUBLE,
        charge: Sequelize.DOUBLE,
        payDayOne: Sequelize.STRING,
        payDayTwo: Sequelize.STRING,
        status: {
            type: Sequelize.ENUM,
            values: [
                'active', //Pending
                'paid', //Paid
                'due'
            ],
            defaultValue: 'active'
        },
        desStatus: {
            type: Sequelize.VIRTUAL,
            get() {
                switch (this.getDataValue('status')) {
                    case 'active':
                        return 'Al día'
                    case 'paid':
                        return 'Pagado'
                    case 'due':
                        return 'Atrasado'
                }
            }
        }
    })
    return Account
}
const Model = model()

function findById(id) {
    return Model.findOne({
        where: {
            id: id
        },
        include: [
            PaymentTerm,
            { model: Payment, include: [{ model: User, attributes: { exclude: ['password'] } }] }
        ]
    })

}

function findAllActive() {
    return Model.findAll({
        where: {
            status: {
                [Op.notIn]: ['paid']
            }
        },
        include: [PaymentTerm]
    })

}

Model.findById = findById
Model.findAllActive = findAllActive

export default Model
