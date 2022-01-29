const { Router } = require('express');
const express = require('express');
const passport = require('passport');

const usuariosRouter = express.Router();

usuariosRouter.post('/registro', (req, res, next) => {
    const callback = (error, usuario) => {
        if (error) {
            return next(error);
        }

        req.logIn(usuario, (errorLogin) => {
            // Si hay un error logeando
            if (errorLogin) {
                return next(errorLogin);
            }
            res.status(201).json(usuario);
        })
    };

    passport.authenticate('registro', callback)(req);
});

module.exports = usuariosRouter;
