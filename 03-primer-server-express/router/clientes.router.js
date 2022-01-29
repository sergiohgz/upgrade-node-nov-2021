const express = require('express');
const Cliente = require('../models/Cliente');

const clientesRouter = express.Router();

clientesRouter.get('/', (req, res, next) => {
    return Cliente.find()// .populate('coches')
        .then(clientes => {
            return res.status(200).json(clientes);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

clientesRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    return Cliente.findById(id).populate('coches')
        .then((cliente) => {
            if (!cliente) {
                const error = new Error('Cliente no encontrado');
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

clientesRouter.post('/', (req, res, next) => {
    const nuevoCliente = new Cliente({
        nombre: req.body.nombre,
        edad: req.body.edad,
        apellido: req.body.apellido,
        coches: [],
    })
    return nuevoCliente.save()
        .then(() => {
            return res.status(201).json(nuevoCliente);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

clientesRouter.put('/:id/coches', (req, res, next) => {
    const clienteId = req.params.id;
    const idDelCocheAAnadir = req.body.cocheId;

    return Cliente.findByIdAndUpdate(
        clienteId,
        { $push: { coches: idDelCocheAAnadir } },
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

clientesRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    return Cliente.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Cliente con id ${id} eliminado`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});


module.exports = clientesRouter;
