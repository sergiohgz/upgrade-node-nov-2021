const express = require('express');
const passport = require('passport');

const usuariosRouter = express.Router();

usuariosRouter.post('/registro', (req, res, next) => {
    const callback = (error, usuario) => {
        if (error) {
            console.log('Error al entrar en callback', error);
            return next(error);
        }

        req.logIn(usuario, (errorLogin) => {
            // Si hay un error logeando
            if (errorLogin) {
                console.log('Error al hacer login', errorLogin);
                return next(errorLogin);
            }
            res.status(201).json(usuario);
        })
    };

    passport.authenticate('registro', callback)(req);
});

usuariosRouter.post('/login', (req, res, next) => {
    const callback = (error, usuario) => {
        if (error) {
            return next(error);
        }
        req.logIn(usuario, (errorLogin) => {
            if (errorLogin) {
                return next(errorLogin);
            }
            return res.status(200).json(usuario);
        });
    };

    passport.authenticate('login', callback)(req);
});

usuariosRouter.post('/logout', (req, res, next) => {
    if (!req.user) {
        return res.sendStatus(304);
        // res.status(304).send();
    }
    // Cerrar la sesión en la petición
    req.logOut();

    // Destruir la sesión de la petición
    return req.session.destroy(() => {
        res.clearCookie('connect.sid');
        return res.status(200).json('Cerrada sesión de usuario');
    });
});

module.exports = usuariosRouter;
