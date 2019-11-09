'use strict'
import chalk from 'chalk'
import db from './index'
import Account from '../models/account.model'
import Customer from '../models/customer.model'
import User from '../models/user.model'
import Location from '../models/location.model'
import Payment from '../models/payment.model'
import Route from '../models/route.model'
import RouteDetail from '../models/routeDetail.model'
import PaymentTerm from '../models/paymentTerm.model'

export default async () => {
    // User relations
    //Account relations 
    Account.hasMany(Payment);
    Account.belongsTo(PaymentTerm);   
    Customer.hasMany(Account);  
    Location.hasMany(Customer); 
    Payment.belongsTo(User);
    Payment.belongsTo(Account);
    RouteDetail.belongsTo(Customer);
    RouteDetail.belongsTo(Route);
    Route.belongsTo(User, { as: 'driver' });
    Route.belongsTo(User, { as: 'createdBy' });


    try {
        await db.sync({
            //alter: true
        })
    } catch (e) {
        console.log(e)
    }

    console.log(chalk.cyan('[Database] Database initialized'))
}
