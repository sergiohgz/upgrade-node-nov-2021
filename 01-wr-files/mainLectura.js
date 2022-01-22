const fs = require('fs');

fs.readFile('coches.json', (err, infoLeida) => {
    if (err) {
        console.error('ERROR ha sucedido un error:', err);
        return;
    }
    const coches = JSON.parse(infoLeida);
    for (let coche of coches) {
        console.log('Marca: ', coche.marca);
        console.log('Modelo: ', coche.modelo);
        console.log('--------');
    }
    // console.log('Información Leida:', coches[0]);
});
