const mongoose = require('mongoose');
const db = require('../db');
const Coche = require('../models/Coche');

const coches = [
    { marca: 'Volkswagen', modelo: 'Golf', annoFabricacion: 2020 },
    { marca: 'Volkswagen', modelo: 'Polo', annoFabricacion: 2015 },
    { marca: 'Ford', modelo: 'Focus', annoFabricacion: 2022 },
    { marca: 'Fiat', modelo: 'Stilo', annoFabricacion: 2005 },
];

const cochesDocuments = coches.map(coche => new Coche(coche));

db.connectDB()
    // Ver si hay coches y eliminarlos
    .then(async () => {
        const todosLosCoches = await Coche.find();
        if (todosLosCoches.length > 0) {
            await Coche.collection.drop();
        }
    })
    .catch(err => console.error(`Error eliminado información de la DB: ${err}`))
    // Añadir documentos de coches a la base de datos
    .then(async () => {
        await Coche.insertMany(cochesDocuments)
        // await Promise.all(cochesDocuments.map((coche) => Coche.insert(coche)));
    })
    .catch(err => console.error(`Error creando documentos en DB: ${err}`))
    // Cerrar la conexión
    .finally(() => mongoose.disconnect())
