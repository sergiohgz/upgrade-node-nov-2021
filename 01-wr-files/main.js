const fileSystem = require('fs');

const coches = [
    { id: 1, marca: 'Volkswagen', modelo: 'Golf', annoFabricacion: 2020 },
    { id: 2, marca: 'Volkswagen', modelo: 'Polo', annoFabricacion: 2015 },
    { id: 3, marca: 'Ford', modelo: 'Focus', annoFabricacion: 2022 },
];

fileSystem.writeFile('coches.json', JSON.stringify(coches), (error) => {
    if (error) {
        console.error('ERROR al escribir fichero', error);
        return;
    }
    console.log('YEAH mi fichero se ha creado');
    // return;
});
