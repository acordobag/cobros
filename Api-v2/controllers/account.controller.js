import Account from '../models/account.model'
import Payment from '../models/payment.model'
import PaymentTerm from '../models/paymentTerm.model'

async function save(req, res, next) {
    try {
        let account = {
            name: req.body.name,
            initialAmmount: req.body.initialAmmount,
            actualAmmount: req.body.actualAmmount,
            interestRate: req.body.interestRate,
            numberOfPayments: req.body.numberOfPayments,
            charge: req.body.charge,
            payDayOne: req.body.payDayOne,
            payDayTwo: req.body.payDayTwo,
            paymentTermId: req.body.paymentTerm.id,
            customerId: req.body.customer.id
        }
        account.initialAmmount = (account.charge) * (account.numberOfPayments * req.body.paymentTerm.monthPayments);
        account.actualAmmount = account.initialAmmount;

        account = await Account.create(account)
        res.status(200).send(account).end()
    } catch (e) {
        next(e)
        console.error(e)
    }

}

async function findAll(req, res, next) {
    try {
        let accounts = await Account.findAllActive();
        res.status(200).send(accounts).end()
    } catch (e) {
        next(e)
    }

}

async function findById(req, res, next) {
    try {
        let account = await Account.findById(req.body.id)
        res.status(200).send(account).end()
    } catch (e) {
        next(e)
    }
}

async function addPayment(req, res, next) {
    try {
        let payment = {
            ammount: req.body.ammount,
            createDate: req.body.createDate,
            status: 'paid',
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
        let payments = await Payment.findPendings()
        let newArray = []
        for (let p of payments) {
            newArray.push({
                accountId: p.accountId,
                ammount: p.ammount,
                status: p.status,
                createDate: p.createDate,
                desStatus: p.desStatus,
                id: p.id,
                driverName: p.user.name,
                productName: p.account.name,
                customerName: p.account.customer.fullName
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

async function applyPayment(req, res, next) {
    try {
        let payment = await Payment.findById(req.body.id)
        payment.status = 'paid'
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
        let newArray
        for (let p of payments) {
            newArray.push({
                accountId: p.accountId,
                ammount: p.ammount,
                status: p.status,
                date: p.date,
                desStatus: p.desStatus,
                id: p.id,
                driverName: p.user.name,
            })
        }
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
    try {
        let payment = await Payment.findOne({ where: { id: id } })
        payment.status = 'approved'
        let account = await Account.findById(payment.accountId)
        let newActualAmmount = (account.actualAmmount - payment.ammount)
        if (newActualAmmount < 0) {
            throw "El pago no puede ser mayor que el saldo restante. Saldo: " + account.actualAmmount
        } else if (newActualAmmount == 0) {
            account.status = 'paid'
            account.actualAmmount = newActualAmmount
        } else {
            account.actualAmmount = newActualAmmount
        }
        await payment.save()
        await account.save()

    } catch (e) {
        next(e)
    }
}

async function _createPayments() {

}

async function getCustomerUnPaidAccounts(customerId, next) {
    try {
        const daysBetwen = 1;
        let unpaid = [];
        let accounts = await Account.findAllAcWDuePayByCId(customerId);

        if (accounts.length > 0) {

            let today = new Date().getDate();
            let daysBefore = new Date();
            let daysAfter = new Date();
            let todayWeekDay = "w" + new Date().getDay();

            daysBefore.setDate(today - daysBetwen);
            daysAfter.setDate(today + daysBetwen);

            for (let i = 0; i < accounts.length; i++) {
                const acc = accounts[i];
                if (
                    (acc.payDayOne >= daysBefore.getDate() && acc.payDayOne <= daysAfter.getDate()) || //Si el dida d pago esta entre hoy o mañana
                    (acc.payDayTwo >= daysBefore.getDate() && acc.payDayTwo <= daysAfter.getDate()) ||
                    (acc.payDayOne == todayWeekDay) //Si es igual al día de la semana
                ) {
                    //Si se cumple algun escenario lo meye al listado de cuentas por cobrar
                    unpaid.push(acc);
                }
            }
        }
        //Falta la logica de los días de la semana
        return unpaid;

    } catch (e) {
        next(e)
    }
}

export default {
    save,
    findAll,
    findById,
    addPayment,
    applyPayment,
    findAllPendingPayments,
    approvePayment,
    approveListOfPayments,
    findAccountPayments,
    findAllPaymentsTerms,
    getCustomerUnPaidAccounts
}