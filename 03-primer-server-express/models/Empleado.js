const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const empleadoSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String },
    clientes: [{ type: mongoose.Types.ObjectId, ref: 'Cliente' }],
}, {
    timestamps: true
});

const Empleado = mongoose.model('Empleado', empleadoSchema);

module.exports = Empleado;
