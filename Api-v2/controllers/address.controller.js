import Address from '../models/address.model'


async function save(req, res, next) {
    try {
        let address = {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            latitude: req.body.latitude,
            detail: req.body.detail,
            isPreferred: req.body.isPreferred,
            customerId: req.body.customer.id,
        }
        address = await Address.create(address)
        res.status(200).send(address).end()
    } catch (e) {
        next(e)
        console.error(e)
    }

}

async function _retriveAddresses(location) {
    let addresses = [];
    try {
        if (location.state && location.city && location.street) {
            //Retrive all addresses of this street and write customer into location detail
            addresses = await Address.findAll({
                where: {
                    state: location.state,
                    city: location.city,
                    street: location.street,
                    isPreferred: true
                }
            })
        } else if (location.state && location.city) {
            //Retrive all addresses of this street and write customer into location detail
            addresses = await Address.findAll({
                where: {
                    state: location.state,
                    city: location.city,
                    isPreferred: true
                }
            })
        } else if (location.state) {
            //Retrive all addresses of this street and write customer into location detail
            addresses = await Address.findAll({
                where: {
                    state: location.state,
                    isPreferred: true
                }
            })
        }

        return addresses;
    } catch (e) {
        next(e)
    }
}

export default {
    save,
    _retriveAddresses
}