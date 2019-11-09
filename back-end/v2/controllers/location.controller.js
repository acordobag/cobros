import Location from '../models/Location.model'
import Customer from '../models/customer.model'

async function save(req, res, next) {
    try {
        let location = {
            name: req.body.name
        }
        if (!location.name) { throw new Error('No se puede insertar un valor nulo'); }
        location = await Location.create(location)
        res.status(200).send(location).end()
    } catch (e) {
        next(e)
    }

}

async function findAll(req, res, next) {
    try {
        // { include: [{ model: Customer, as: 'customers' }] }
        let locations = await Location.findAll()
        res.status(200).send(locations).end()
    } catch (e) {
        next(e)
    }
}

export default {
    save,
    findAll
}