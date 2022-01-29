const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema(
    {
        correo: { type: String, required: true },
        contrasena: { type: String, required: true },
        // nombre: { type: String, required: true },
    }, {
        timestamps: true
    }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
