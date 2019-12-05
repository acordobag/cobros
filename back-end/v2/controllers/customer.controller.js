import Customer from '../models/customer.model'
import Zone from '../models/zone.model'
import Account from '../models/account.model'
import Address from '../models/address.model'
import PaymentTerm from '../models/paymentTerm.model'


async function save(req, res, next) {
    try {
        let customer = {
            citizenId: req.body.citizenId,
            name: req.body.name,
            lastName: req.body.lastName,
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            zoneId: req.body.zone.id
        }
        customer = await Customer.create(customer)
        res.status(200).send(customer).end()
    } catch (e) {
        next(e)
    }

}

async function findAll(req, res, next) {
    try {
        let customers = await Customer.findAll({ include: [Zone, Account, Address] })
        res.status(200).send(customers).end();
    } catch (e) {
        next(e)
    }


}

async function findById(req, res) {
    try {
        let customer = await Customer.findOne({
            where: {
                id: req.body.id
            },
            include: [Zone, {
                model: Account,
                include: [PaymentTerm]
            }]
        })
        res.status(200).send(customer).end();
    } catch (e) {
        next(e)
    }

}

export default {
    save,
    findAll,
    findById
}