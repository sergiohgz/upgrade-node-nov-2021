const mongoose = require('mongoose');
const db = require('../db');
const Cliente = require('../models/Cliente');

const clientes = [
    { nombre: 'Mario', apellido: 'Martinez', edad: 30 },
];

const clientesDocuments = clientes.map(cliente => new Cliente(cliente));

db.connectDB()
    // Ver si hay clientes y eliminarlos
    .then(async () => {
        const todosLosClientes = await Cliente.find();
        if (todosLosClientes.length > 0) {
            await Cliente.collection.drop();
        }
    })
    .catch(err => console.error(`Error eliminado información de la DB: ${err}`))
    // Añadir documentos de clientes a la base de datos
    .then(async () => {
        await Cliente.insertMany(clientesDocuments)
        // await Promise.all(clientesDocuments.map((cliente) => Cliente.insert(cliente)));
    })
    .catch(err => console.error(`Error creando documentos en DB: ${err}`))
    // Cerrar la conexión
    .finally(() => mongoose.disconnect())
