const fs = require('fs');

const archivo = './coches.json';

function anadirCoche(marca, modelo, annoFabricacion, callback) {
    // 1. Leer el fichero
    fs.readFile(archivo, (errorLectura, datosLeidos) => {
        if(errorLectura) {
            console.error('Error al leer fichero: ', errorLectura);
            return;
        }
        const coches = JSON.parse(datosLeidos);

        // 2. Añadir al listado de coches leido el coche que recibimos por argumentos
        const ultimoCoche = coches[coches.length - 1];
        const cocheAAnadir = { marca, modelo, annoFabricacion, id: ultimoCoche.id + 1 };
        coches.push(cocheAAnadir);

        // 3. Escribir/Persistir el fichero
        fs.writeFile(archivo, JSON.stringify(coches), (errorEscritura) => {
            if (errorEscritura) {
                console.error('Error al escribir el fichero: ', errorEscritura);
                return;
            }
            console.log('Coche añadido correctamente al fichero');
            callback();
        });
    });
}

anadirCoche('Ford', 'Fiesta', 2004, () => {
    console.log('Se ha añadido el primer coche');
    anadirCoche('Fiat', 'Punto', 2006, () => {
        anadirCoche('BMW', '118d', 2020, () => {
            console.log('Añadidos 3 coches');
        });
    });
});
