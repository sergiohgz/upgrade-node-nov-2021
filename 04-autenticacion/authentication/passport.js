const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');

const Usuario = require('../models/Usuario');

const LocalStrategy = passportLocal.Strategy;

const SALTOS_ENCRIPTADO = 10;

passport.use('registro',
    new LocalStrategy(
        {
            usernameField: 'correo', // req.body.correo
            passwordField: 'contrasena', // req.body.contrasena
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                // 1. Buscar si el usuario existe en la DB
                const usuarioExistente = await Usuario.findOne({ correo: username });

                // 2. Si el usuario ya existe, salimos con un error
                if (usuarioExistente) {
                    const error = new Error('Usuario ya registrado');
                    return done(error);
                }

                // 3. Encriptar la contraseña
                const passwordEncriptada = await bcrypt.hash(password, SALTOS_ENCRIPTADO);

                // 4. Crear el documento del Usuario para guardarlo en DB
                const nuevoUsuario = new Usuario({
                    correo: username,
                    contrasena: passwordEncriptada,
                    // nombre: req.body.nombre // passReqToCallback = false, no podemos acceder aquí a req
                });
                const usuarioGuardado = await nuevoUsuario.save();

                // 5. Retornar OK/KO
                done(null, usuarioGuardado);
            } catch(error) {
                return done(error);
            }
        }
    ))
