const http = require('http');
const fs = require('fs');

const PORT = 3000;

// Si la llamada es a / vamos a entregar un HTML que renderizará el navegador
// Si la llamada es a /coches, enviaremos la información que tenemos en el fichero coches.json

const htmlToSend = `<html>
    <body>
        <h1>Upgrade Hub - Node server</h1>
        <p>Soy un documento HTML enviado por el servidor</p>
    </body>
</html>`;

const manejadorPeticiones = (peticion, respuesta) => {
    if (peticion.url === '/') {
        respuesta.setHeader('Content-Type', 'text/html');
        respuesta.end(htmlToSend);
        return;
    } else if (peticion.url === '/coches') {
        fs.readFile('./coches.json', (errorLectura, datosLeidos) => {
            if (errorLectura) {
                console.error('Error leyendo archivo', errorLectura);
                respuesta.writeHead(500);
                respuesta.end('Ha ocurrido un error en el servidor, intentelo más tarde');
                return;
            }
            // const coches = JSON.parse(datosLeidos);
            respuesta.setHeader('Content-Type', 'application/json');
            respuesta.writeHead(200);
            // respuesta.end(JSON.stringify(coches));
            // Como datosLeidos es un string, se puede enviar directamente sin parsear y stringificar
            respuesta.end(datosLeidos);
        });
        return;
    } else {
        respuesta.writeHead(404);
        respuesta.end('No se ha encontrado el recurso');
        return;
    }
}

const servidor = http.createServer(manejadorPeticiones);

servidor.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ', PORT);
});
