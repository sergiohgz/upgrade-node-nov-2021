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

                // 4.1. Eliminar contrasena del nuevoUsuario para no mandarlo en la respuesta
                usuarioGuardado.contrasena = undefined;

                // 5. Retornar OK/KO
                done(null, usuarioGuardado);
            } catch(error) {
                return done(error);
            }
        }
    ))

passport.use('login',
    new LocalStrategy(
        {
            usernameField: 'correo', // req.body.correo
            passwordField: 'contrasena', // req.body.contrasena
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                // 1. Buscar el usuario por el correo/nombre de usuario/algo unico que el usuario si conozca y recuerde
                const usuario = await Usuario.findOne({ correo: username });

                // 2. Si el usuario no existe fallamos (porque no puede logearse nadie que no esté registrado)
                if (!usuario) {
                    const error = new Error('Usuario no registrado');
                    return done(error);
                }

                // 3. Comparar contraseñas
                const esValidaContrasena = await bcrypt.compare(password, usuario.contrasena);

                // 4. Si la contraseña no es valida, fallamos
                if (!esValidaContrasena) {
                    const error = new Error('Contraseña incorrecta');
                    return done(error);
                }

                // 5. Damos por valido el login ya que el correo encaja y la contraseña es valida
                usuario.contrasena = undefined;
                return done(null, usuario);
            } catch(error) {
                return done(error);
            }
        }
    ))

passport.serializeUser((user, done) => {
    return done(null, user._id);
});
passport.deserializeUser(async (userId, done) => {
    try {
        const usuario = await Usuario.findById(userId);
        return done(null, usuario);
    } catch(error) {
        return done(error);
    }
});
