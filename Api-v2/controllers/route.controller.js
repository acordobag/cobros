import Route from '../models/route.model'


async function createRoute(req, res, next) {
    try {
        let route = {
            locations: req.body.locations,
            name: req.body.name,
            driverId: req.body.driver.id,
            createdById: req.body.user.id,
            state: req.body.state
        }
        route = await Route.create(account)
        res.status(200).send(route).end()
    } catch (e) {
        next(e)
    }
}