//Requerimos el modelo  de usuarios
var User = require('../models/user.model.js');
var jwt = require('jwt-simple');
var config = require('../config/database');
var bcrypt = require('bcryptjs');

module.exports.save = function (req, res) {

    var pass = '';
    if (req.body.password) {
        pass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    }

    var user = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: pass,
        isDriver: req.body.isDriver,
        token: ''
    };

    User.create(user).then(function (puser) {
        if (puser) {
            res.send(puser);
        } else if (!puser) {
            res.send({ msj: "No se creo el usuario!" });
        }
    });

};


//Funcion que autentica un usuario
module.exports.authenticate = function (req, res) {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (user) {
        if (!user) {
            return res.send({ status: 400, success: false, msg: 'Correo incorrecto.' });
        } else {
            var isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (isMatch) {
                var token = jwt.encode(user, config.secret);
                user.token = 'JWT ' + token;
                user.password = '';
                res.send(user);
            } else {
                return res.send({ status: 400, success: false, msg: 'Contraseña incorrecta.' });
            }
        }
    });
};


module.exports.findById = function (req, res) {
    User.findOne({ _id: req.body.id }, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            user.password = "";
            res.send(user);
        }
    });
};

//Find all
module.exports.finAll = function (req, res) {
    User.findAll().then(function (users) {
        res.send(users);
    });
};