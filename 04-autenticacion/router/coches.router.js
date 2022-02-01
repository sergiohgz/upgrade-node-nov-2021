const express = require('express');
const Coche = require('../models/Coche');
const auth = require('../middlewares/auth.middleware');

const cochesRouter = express.Router();

const coches = [
    { id: 1, marca: 'Volkswagen', modelo: 'Golf', annoFabricacion: 2020 },
    { id: 2, marca: 'Volkswagen', modelo: 'Polo', annoFabricacion: 2015 },
    { id: 3, marca: 'Ford', modelo: 'Focus', annoFabricacion: 2022 },
];

// GET /coches/ === /coches
cochesRouter.get('/', (req, res, next) => {
    // const anterioresA = Number(req.query.anterioresA);
    // const posterioresA = Number(req.query.posterioresA);
    // if (!isNaN(anterioresA) && !isNaN(posterioresA)) {
    //     const filtrados = coches.filter(coche => coche.annoFabricacion < anterioresA && coche.annoFabricacion > posterioresA);
    //     return res.status(200).send(filtrados);
    // }
    // if (!isNaN(anterioresA)) {
    //     const filtrados = coches.filter(coche => coche.annoFabricacion < anterioresA);
    //     return res.status(200).send(filtrados);
    // }
    // if (!isNaN(posterioresA)) {
    //     const filtrados = coches.filter(coche => coche.annoFabricacion > posterioresA);
    //     return res.status(200).send(filtrados);
    // }

    // return res.status(200).send(coches);
    let filtro = {};
    if (req.query.marca) {
        filtro = { ...filtro, marca: req.query.marca };
    }
    const anterioresA = Number(req.query.anterioresA);
    const posterioresA = Number(req.query.posterioresA);
    if (!isNaN(anterioresA) && !isNaN(posterioresA)) {
        // const filtrados = coches.filter(coche => coche.annoFabricacion < anterioresA && coche.annoFabricacion > posterioresA);
        // return res.status(200).send(filtrados);
        filtro = { ...filtro, annoFabricacion: { $lt: anterioresA, $gte: posterioresA } };
    } else if (!isNaN(anterioresA)) {
        // const filtrados = coches.filter(coche => coche.annoFabricacion < anterioresA);
        // return res.status(200).send(filtrados);
        filtro = { ...filtro, annoFabricacion: { $lt: anterioresA } } // $lt === menor que, $lte === menor o igual que
    } else if (!isNaN(posterioresA)) {
        // const filtrados = coches.filter(coche => coche.annoFabricacion >= posterioresA);
        // return res.status(200).send(filtrados);
        filtro = { ...filtro, annoFabricacion: { $gte: posterioresA } }; // $gt === mayor que, $gte === mayor o igual que
    }

    console.log('Filtro de /coches', filtro);
    return Coche.find(filtro)
        .then(cochesLeidos => {
            return res.status(200).json(cochesLeidos);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

// GET /coches/2
cochesRouter.get('/:id', (req, res, next) => {
    // const id = Number(req.params.id);
    // const index = coches.findIndex(coche => coche.id === id);
    // if (index < 0) {
    //     const error = new Error(`Coche con id ${id} no encontrado`);
    //     error.status = 404;
    //     return next(error);
    // }
    // const coche = coches[index];
    // return res.status(200).send(coche);
    const id = req.params.id;
    return Coche.findById(id)
        .then((coche) => {
            if (!coche) {
                const error = new Error('Coche no encontrado');
                error.status = 404;
                return next(error);
            }
            return res.status(200).json(coche);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

cochesRouter.post('/', [auth.isAuthenticated], (req, res, next) => {
    console.log('Body recibido', req.body);
    const nuevoCoche = new Coche(/*{
        marca: req.body.marca,
        modelo: req.body.modelo,
        annoFabricacion: req.body.annoFabricacion,
    }*/
    req.body);

    return nuevoCoche.save()
        .then(() => {
            return res.status(201).json(nuevoCoche);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

cochesRouter.put('/:id', [auth.isAuthenticated], (req, res, next) => {
    const id = req.params.id;
    // const cocheEditado = new Coche(req.body);
    // cocheEditado._id = id; // Reasignamos el id para sobreescribir el documento en la DB
    // return Coche.findByIdAndUpdate(id, cocheEditado, { /* returnDocument: 'after', */ new: true })
    //     .then(cocheActualizado => {
    //         return res.status(200).json(cocheActualizado);
    //     })
    //     .catch(err => {
    //         const error = new Error(err);
    //         error.status = 500;
    //         return next(error);
    //     });
    return Coche.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .then(cocheActualizado => {
            return res.status(200).json(cocheActualizado);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

cochesRouter.delete('/:id', [auth.isAuthenticated], (req, res, next) => {
    const id = req.params.id;
    return Coche.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Coche con id ${id} eliminado`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

module.exports = cochesRouter;
