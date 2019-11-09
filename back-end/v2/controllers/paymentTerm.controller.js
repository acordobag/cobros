import PaymentTerm from '../models/paymentTerm.model'

async function save(req, res, next) {
    try {
        let paymentTerm = {
            name: req.body.name
        }
        payment = await PaymentTerm.create(paymentTerm)
        res.status(200).send(payment).end()
    } catch (e) {
        next(e)
    }
}

async function findAll(req, res, next) {
    try {
        let payments = await PaymentTerm.findAll()
        res.status(200).send(payments).end()
    } catch (e) {
        next(e)
    }
}

export default {
    save,
    findAll
}