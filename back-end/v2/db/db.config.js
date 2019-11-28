'use strict'
import chalk from 'chalk'
import db from './index'
import Account from '../models/account.model'
import Customer from '../models/customer.model'
import User from '../models/user.model'
import Zone from '../models/zone.model'
import Payment from '../models/payment.model'
import Route from '../models/route.model'
import RouteDetail from '../models/routeDetail.model'
import PaymentTerm from '../models/paymentTerm.model'

export default async () => {
    // User relations
    //Account relations 
    Account.hasMany(Payment);
    Account.belongsTo(PaymentTerm); 

    Customer.belongsTo(Zone);
    Customer.hasMany(Account);   

    Zone.hasMany(Customer,{ as: "customers" });

    Payment.belongsTo(User);
    Payment.belongsTo(Account);

    Route.belongsTo(User, { as: 'driver' });
    Route.belongsTo(User, { as: 'createdBy' });
    
    RouteDetail.belongsTo(Customer);
    RouteDetail.belongsTo(Route);

    try {
        await db.sync({
            //alter: true
        })
    } catch (e) {
        console.log(e)
    }

    console.log(chalk.cyan('[Database] Database initialized'))
}
