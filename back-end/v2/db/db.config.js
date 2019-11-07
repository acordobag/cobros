'use strict'
import chalk from 'chalk'
import db from './index'

export default async () => {
    // User relations
    //Account relations 
    Account.hasMany(Payment);
    Account.belongsTo(PaymentTerm);

    try {
        await db.sync({
            //alter: true
        })
    } catch (e) {
        console.log(e)
    }

    console.log(chalk.cyan('[Database] Database initialized'))
}
