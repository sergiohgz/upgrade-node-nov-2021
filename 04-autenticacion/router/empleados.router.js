const express = require('express');
const Empleado = require('../models/Empleado');

const empleadosRouter = express.Router();

empleadosRouter.get('/', (req, res, next) => {
    return Empleado.find()// .populate('clientes')
        .then(empleados => {
            return res.status(200).json(empleados);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

empleadosRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    return Empleado.findById(id).populate('clientes')
        .then((cliente) => {
            if (!cliente) {
                const error = new Error('Empleado no encontrado');
                error.status = 404;
                return next(error);
            }
            return res.status(200).json(cliente);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

empleadosRouter.post('/', (req, res, next) => {
    const nuevoEmpleado = new Empleado({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        clientes: [],
    })
    return nuevoEmpleado.save()
        .then(() => {
            return res.status(201).json(nuevoEmpleado);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

empleadosRouter.put('/:id/clientes', (req, res, next) => {
    const empleadoId = req.params.id;
    const idDelClienteAAnadir = req.body.clienteId;

    return Empleado.findByIdAndUpdate(
        empleadoId,
        { $push: { clientes: idDelClienteAAnadir } },
        { new: true }
    )
        .then(clienteActualizado => {
            return res.status(200).json(clienteActualizado);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

empleadosRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    return Empleado.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Empleado con id ${id} eliminado`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});


module.exports = empleadosRouter;
