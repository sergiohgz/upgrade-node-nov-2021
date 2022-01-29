const mongoose = require('mongoose');
const db = require('../db');
const Empleado = require('../models/Empleado');

const empleados = [
    { nombre: 'Javier', apellido: 'Costa' },
    { nombre: 'Alfredo' },
];

const empleadosDocuments = empleados.map(empleado => new Empleado(empleado));

db.connectDB()
    // Ver si hay empleados y eliminarlos
    .then(async () => {
        const todosLosEmpleados = await Empleado.find();
        if (todosLosEmpleados.length > 0) {
            await Empleado.collection.drop();
        }
    })
    .catch(err => console.error(`Error eliminado información de la DB: ${err}`))
    // Añadir documentos de empleados a la base de datos
    .then(async () => {
        await Empleado.insertMany(empleadosDocuments)
        // await Promise.all(empleadosDocuments.map((empleado) => Empleado.insert(empleado)));
    })
    .catch(err => console.error(`Error creando documentos en DB: ${err}`))
    // Cerrar la conexión
    .finally(() => mongoose.disconnect())
