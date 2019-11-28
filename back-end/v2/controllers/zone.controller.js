import Zone from '../models/zone.model'
import Customer from '../models/customer.model'

async function save(req, res, next) {
    try {
        let zone = {
            name: req.body.name
        }
        if (!zone.name) { throw new Error('No se puede insertar un valor nulo'); }
        zone = await Zone.create(zone)
        res.status(200).send(zone).end()
    } catch (e) {
        next(e)
    }

}

async function findAll(req, res, next) {
    try {
        // 
        let zones = await Zone.findAll({ include: { model: Customer, as: 'customers' } })
        res.status(200).send(zones).end()
    } catch (e) {
        next(e)
    }
}

export default {
    save,
    findAll
}