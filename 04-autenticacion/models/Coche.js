const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cocheSchema = new Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    annoFabricacion: { type: Number, required: true },
    ruedas: { type: Number }, // No es obligatorio
}, {
    timestamps: true
});

const Coche = mongoose.model('Coche', cocheSchema);

module.exports = Coche;
