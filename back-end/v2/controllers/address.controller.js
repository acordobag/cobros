import Address from '../models/address.model'


async function save(req, res, next) {
    try {
        let account = {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            latitude: req.body.latitude,
            detail: req.body.detail,
            isPreferred: req.body.isPreferred,
            customerId: req.body.customer.id,
        }
        account = await Address.create(account)
        res.status(200).send(account).end()
    } catch (e) {
        next(e)
        console.error(e)
    }

}

export default {
    save
}