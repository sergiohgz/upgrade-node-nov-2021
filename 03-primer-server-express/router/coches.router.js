const express = require('express');

const cochesRouter = express.Router();

const coches = [
    { id: 1, marca: 'Volkswagen', modelo: 'Golf', annoFabricacion: 2020 },
    { id: 2, marca: 'Volkswagen', modelo: 'Polo', annoFabricacion: 2015 },
    { id: 3, marca: 'Ford', modelo: 'Focus', annoFabricacion: 2022 },
];

// GET /coches/ === /coches
cochesRouter.get('/', (req, res) => {
    const anterioresA = Number(req.query.anterioresA);
    const posterioresA = Number(req.query.posterioresA);
    if (!isNaN(anterioresA) && !isNaN(posterioresA)) {
        const filtrados = coches.filter(coche => coche.annoFabricacion < anterioresA && coche.annoFabricacion > posterioresA);
        return res.status(200).send(filtrados);
    }
    if (!isNaN(anterioresA)) {
        const filtrados = coches.filter(coche => coche.annoFabricacion < anterioresA);
        return res.status(200).send(filtrados);
    }
    if (!isNaN(posterioresA)) {
        const filtrados = coches.filter(coche => coche.annoFabricacion > posterioresA);
        return res.status(200).send(filtrados);
    }

    return res.status(200).send(coches);
});

// GET /coches/2
cochesRouter.get('/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const index = coches.findIndex(coche => coche.id === id);
    if (index < 0) {
        const error = new Error(`Coche con id ${id} no encontrado`);
        error.status = 404;
        return next(error);
    }
    const coche = coches[index];
    return res.status(200).send(coche);
});

cochesRouter.post('/', (req, res, next) => {
    const error = new Error('Method POST not implemented');
    error.status = 405;
    return next(error);
});

cochesRouter.put('/:id', (req, res, next) => {
    const error = new Error('Method PUT not implemented');
    error.status = 405;
    return next(error);
});

cochesRouter.delete('/:id', (req, res, next) => {
    const error = new Error('Method DELETE not implemented');
    error.status = 405;
    return next(error);
});

module.exports = cochesRouter;
