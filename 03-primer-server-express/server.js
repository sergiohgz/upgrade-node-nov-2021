const express = require('express');
const cochesRouter = require('./router/coches.router');
const clientesRouter = require('./router/clientes.router');
const empleadosRouter = require('./router/empleados.router');
const db = require('./db');

const PORT = 3000;

const server = express();

// Añadimos los middlewares para poder leer los body
server.use(express.json());
server.use(express.urlencoded({ extended: false })); // extended = false utiliza la librería querystring, extended = true utiliza la librería qs


server.get('/', (req, res) => {
    res.status(200).send('Server is up & running');
});

server.use('/coches', cochesRouter);
server.use('/clientes', clientesRouter);
server.use('/empleados', empleadosRouter);

server.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    return next(error);
});

server.use((err, _req, res, _next) => {
    return res
        .status(err.status || 500)
        .json(err.message || 'Error inesperado en servidor');
});

db.connectDB().then(() => {
    console.log('Conectado a base de datos Mongo');
    server.listen(PORT, () => {
        console.log(`Iniciado servidor express en puerto ${PORT}`);
    });
});
