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
            createdById: req.body.user.id,
            state: 0
        }

        let newRoute = await Route.create(route);
        let locations = req.body.locations

        for (let i = 0; i < locations.length; i++) {
            const addressList = await AddressController._retriveAddresses(locations[i]);

            for (let j = 0; j < addressList.length; j++) {

                const customer = await CustomerController._findById(addressList[j].customerId);
                if (customer) {
                    const unpaidCustomerAcc = await AccountController.getCustomerUnPaidAccounts(customer.id, next);
                    //check if is day to generate customer due payment
                    for (let f = 0; f < unpaidCustomerAcc.length; f++) {
                        const account = unpaidCustomerAcc[f];
                        const detail = {
                            routeId: newRoute.id,
                            accountId: account.id,
                            state: 0
                        }
                        await RouteDetail.create(detail);
                    }
                }
            }
        }

        res.status(200).send({}).end()
    } catch (e) {
        next(e)
    }
}

export default {
    createRoute
}