//Requerimos el modelo  de usuarios
import User from '../models/user.model.js'
import jwt from 'jwt-simple'
import config from '../config/index'
import bcrypt from 'bcryptjs'

async function save(req, res, next) {
    try {
        let pass = '';
        if (req.body.password) {
            pass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
        }

        let user = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: pass,
            isDriver: req.body.isDriver,
            token: ''
        };

        user = await User.create(user)
        res.status(200).send(user).end()
    } catch (e) {
        next(e)
    }

};


//Funcion que autentica un usuario
async function authenticate(req, res, next) {
    try {
        let user = await User.findOne({ where: { email: req.body.email } })
        if (!user) {
            return res.send({ status: 400, success: false, msg: 'Correo incorrecto.' })
        } else {
            var isMatch = bcrypt.compareSync(req.body.password, user.password)
            if (isMatch) {
                var token = jwt.encode(user, config.authentication.jwtSecret)
                user.token = 'JWT ' + token
                user.password = ''
                res.send(user)
            } else {
                return res.send({ status: 400, success: false, msg: 'Contraseña incorrecta.' })
            }
        }
    } catch (e) {
        next(e)
    }


}

async function findById(req, res, next) {
    try {
        let user = await User.findOne({ _id: req.body.id })
        res.status(200).send(user).end()
    } catch (e) {
        next(e)
    }
}

//Find all
async function finAll(req, res, next) {
    try {
        let users = await User.findAll()
        res.status(200).send(users).end()
    } catch (e) {
        next(e)
    }
}

export default {
    save,
    authenticate,
    findById,
    finAll
}