'use strict'

import db from '../db'
const { sequelize, Sequelize } = db

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
export default Model
