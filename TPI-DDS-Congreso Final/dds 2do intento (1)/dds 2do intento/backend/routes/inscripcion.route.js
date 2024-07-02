const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Mostrar todos las inscripciones
router.get("/inscripcion", async (_, res) => {
    try {
        const inscripciones = await db.Inscripciones.findAll({});
        if (inscripciones === null || inscripciones.length === 0) {
            res.status(404).send({ mensaje: "No se encontraron inscripciones" });
        } else {
            res.json(inscripciones);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: "Error interno al buscar inscripciones" });
    }
});

//Filtrar inscripciones por ID
router.get("/inscripcion/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const inscripcion = await db.Inscripciones.findOne({
            where: {
                Id:id
            }
        });
        if (!inscripcion) {
            res.status(404).send({mensaje: "inscripcion no encontrada"});
        } else {
            res.json(inscripcion);
        } 

    } catch (error) {
        res.status(500).send({mensaje: "Error al buscar inscripcion"})
    }
});
module.exports = router;