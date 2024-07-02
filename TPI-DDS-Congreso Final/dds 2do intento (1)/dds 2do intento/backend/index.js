
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./base-orm/sqlite-init');
const port = 3000; // Puerto en el que deseas que escuche tu servidor

// Middleware para permitir CORS
app.use(cors());

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// Endpoint de prueba
app.get("/", (req, res) => {
    res.send("Backend inicial dds-backend! ABS");
});

// Middleware para iniciar la base de datos si no existe
require("./base-orm/sqlite-init");

// Ruta para los tipos de congreso
const tipoCongresoRouter = require("./routes/tipocongreso.route");
app.use(tipoCongresoRouter);

//Ruta para Congreso
const congresoRouter = require("./routes/congreso.route");
app.use(congresoRouter);

//Ruta para Inscripcion
const inscripcionRouter = require("./routes/inscripcion.route");
app.use(inscripcionRouter);


//Ruta para Evaluacion
const evaluacionRouter = require("./routes/evaluacion.route");
app.use(evaluacionRouter);


//Ruta para Oradores
const oradoresRouter = require("./routes/orador.route");
app.use(oradoresRouter);


//Ruta para Participantes
const participantesRouter = require("./routes/participante.route");
app.use(participantesRouter);

//Ruta para Salas
const salasRouter = require("./routes/sala.route");
app.use(salasRouter);


//Ruta Patrocinadores
const patrocinadoresRouter = require("./routes/patrocinador.route");
app.use(patrocinadoresRouter);

// Levantar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
