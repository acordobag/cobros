import Account from '../models/account.model'
import Payment from '../models/payment.model'
import User from '../models/user.model'
import Customer from '../models/customer.model'
import PaymentTerm from '../models/paymentTerm.model'
import { CONNREFUSED } from 'dns'
import { exception } from 'console'


async function save(req, res, next) {
    try {
        let account = {
            name: req.body.name,
            initialAmmount: req.body.initialAmmount,
            actualAmmount: req.body.actualAmmount,
            interestRate: req.body.interestRate,
            numberOfPayments: req.body.numberOfPayments,
            charge: req.body.charge,
            paymentTermId: req.body.paymentTerm.id,
            customerId: req.body.customer.id,
            already_pay: req.body.already_pay
        }
        account = await Account.create(account)
        res.status(200).send(account).end()
    } catch (e) {
        next(e)
        console.error(e)
    }

}

async function findAll(req, res, next) {
    try {
        let accounts = await Account.findAll({ include: [PaymentTerm] })
        res.status(200).send(accounts).end()
    } catch (e) {
        next(e)
    }

}

async function findById(req, res, next) {
    try {
        let account = await Account.findOne({
            where: { id: req.body.id },
            include: [{ model: Payment, include: [User] }]
        })
        res.status(200).send(account).end()
    } catch (e) {
        next(e)
    }
}

async function addPayment(req, res, next) {
    try {
        let payment = {
            ammount: req.body.ammount,
            approved: req.body.approved,
            date: req.body.date,
            userId: req.body.user.id,
            accountId: req.body.account.id
        }
        payment = await Payment.create(payment)
        res.status(200).send(payment).end()
    } catch (e) {
        next(e)
    }
}

async function findAllPendingPayments(req, res, next) {
    try {
        let payments = await Payment.findAll({
            where: { approved: false },
            include: [User, { model: Account, include: [Customer] }]
        })
        let newArray = []
        for (let p of payments) {
            newArray.push({
                accountId: p.accountId,
                ammount: p.ammount,
                approved: p.approved,
                date: p.date,
                id: p.id,
                driverName: p.user.name,
                productName: p.account.name,
                customerName: `${p.account.customer.name} ${p.account.customer.lastName}`
            })
        }
        res.status(200).send(newArray).end()
    } catch (e) {
        next(e)
    }

}

async function approvePayment(req, res, next) {
    try {
        await _approvePayment(req.body.id)
        res.status(200).send({}).end()
    } catch (e) {
        next(e)
    }
}
async function approveListOfPayments(req, res, next) {
    try {
        let payments = req.body.payments
        for (let p of payments) {
            await _approvePayment(p.id)
        }
        res.status(200).send({}).end()
    } catch (e) {
        next(e)
    }
}

async function findAccountPayments(req, res, next) {
    try {
        let payments = await Payment.find({ where: { accountId: req.body.id } })
        res.status(200).send(payments).end()
    } catch (e) {
        next(e)
    }

}

async function findAllPaymentsTerms(req, res, next) {
    try {
        let payments = await PaymentTerm.findAll()
        res.status(200).send(payments).end()
    } catch (e) {
        next(e)
    }
}

async function _approvePayment(id, next) {
    let payment = await Payment.findOne({ where: { id: id } })
    payment.approved = true
    let account = await Account.findOne({ where: { id: payment.accountId } })
    let newActualAmmount = (account.actualAmmount - payment.ammount)
    if (newActualAmmount < 0) {
        throw "El pago no puede ser mayor que el saldo restante. Saldo: " + account.actualAmmount
    } else if (newActualAmmount == 0) {
        account.alreadyPay = true
        account.actualAmmount = newActualAmmount
    } else {
        account.actualAmmount = newActualAmmount
    }
    await payment.save()
    await account.save()
}

export default {
    save,
    findAll,
    findById,
    addPayment,
    findAllPendingPayments,
    approvePayment,
    approveListOfPayments,
    findAccountPayments,
    findAllPaymentsTerms
}