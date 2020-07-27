'use strict'

import db from '../db'
const { sequelize, Sequelize } = db

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
export default Model