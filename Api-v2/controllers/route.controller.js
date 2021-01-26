import Route from '../models/route.model'
import RouteDetail from '../models/routeDetail.model'
import AddressController from './address.controller';


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
            const customers = await AddressController._retriveAddresses(locations[i]);

            for (let j = 0; index < customers.length; j++) {

                //check if customer has accounts 
                //check if is day to generate customer due payment


                const detail = {
                    routerId: newRoute.id,
                    customerId: customers[j].id,
                    state: 0
                }
                await RouteDetail.create(detail);
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