import Route from '../models/route.model'
import RouteDetail from '../models/routeDetail.model'
import AccountController from './account.controller';
import AddressController from './address.controller';
import CustomerController from './customer.controller';


async function createRoute(req, res, next) {
    try {
        const route = {
            name: req.body.name,
            driverId: null,
            createdById: req.body.user.id
        }
        const today = new Date().getDate();
        const newRoute = await Route.create(route);
        const locations = req.body.locations;
        let count = 0;
        for (let i = 0; i < locations.length; i++) {
            const addressList = await AddressController._retriveAddresses(locations[i]);

            for (let j = 0; j < addressList.length; j++) {

                const customer = await CustomerController._findById(addressList[j].customerId);
                if (customer) {
                    const unpaidCustomerAcc = await AccountController.getCustomerUnPaidAccounts(customer.id, next);
                    //check if is day to generate customer due payment
                    let dueAccounts = 0;
                    for (let f = 0; f < unpaidCustomerAcc.length; f++) {
                        const account = unpaidCustomerAcc[f];
                        if (account.payDayOne == today || account.payDayTwo == today || account.status == 'due') {
                            dueAccounts++;
                        }
                    }
                    //
                    if (dueAccounts > 0) {
                        const detail = {
                            routeId: newRoute.id,
                            customerId: customer.id,
                            state: 0
                        }
                        await RouteDetail.create(detail);
                        count++;
                    }
                }
            }
        }

        res.status(200).send({ msg: 'Route created succesfully with ' + count }).end()
    } catch (e) {
        next(e)
    }
}

async function findAllActives(req, res, next) {
    try {
        const routes = await Route.findAllActives()
        res.status(200).send(routes).end();
    } catch (e) {
        next(e)
    }
}

export default {
    createRoute,
    findAllActives
}