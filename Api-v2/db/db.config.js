'use strict'
import chalk from 'chalk'
import db from './index'
import Account from '../models/account.model'
import Address from '../models/address.model'
import Customer from '../models/customer.model'
import User from '../models/user.model'
import Zone from '../models/zone.model'
import Payment from '../models/payment.model'
import Route from '../models/route.model'
import RouteDetail from '../models/routeDetail.model'
import PaymentTerm from '../models/paymentTerm.model'
import settings from '../config'
const config = settings.dbSettings


export default async () => {
    // User relations
    //Account relations 
    Account.hasMany(Payment);
    Payment.belongsTo(Account);

    Account.belongsTo(PaymentTerm);

    Customer.hasMany(Account);
    Account.belongsTo(Customer)
    Customer.hasMany(Address);
    Address.belongsTo(Customer)

    User.hasMany(Payment)
    Payment.belongsTo(User);

    Route.belongsTo(User, { as: 'driver' });
    Route.belongsTo(User, { as: 'createdBy' });

    RouteDetail.belongsTo(Customer);
    RouteDetail.belongsTo(Route);

    try {
        await db.sync({
            alter: config.alter,
            force: config.force
        })
    } catch (e) {
        console.log(e)
    }

    console.log(chalk.cyan('[Database] Database initialized'))
}
