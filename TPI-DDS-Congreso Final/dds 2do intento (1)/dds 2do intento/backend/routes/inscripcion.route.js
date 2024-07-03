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


//Filtrar inscripciones por Participante
router.get("/inscripcion/participante/:filtro", async(req, res) => {
    try {
        const participante = req.params.filtro;
        console.log("Filtro recibido", participante);
        const inscripcion = await db.Inscripciones.findAll({
            where: {
                IdParticipante: participante,
            },
        });
    if (inscripcion.length === 0) {
        res.status(404).send({ mensaje: "Inscripcion no encontrada"});
    } else{
        res.json(inscripcion);
    }
    } catch (error) {
        console.log(error)
        res.status(500).send({mensaje: "Error interno"})
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


router.delete("/inscripcion/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.Inscripciones.destroy({
            where: {
                Id: id
            }
        });

        if (result === 0) {
            res.status(404).send({ mensaje: "inscripcion no encontrada" });
        } else {
            res.status(200).send({ mensaje: "inscripcion eliminada exitosamente" });
        }
        
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar la inscripcion" });
    }
});

router.post("/inscripcion", async (req, res) => {
    try {
        const inscripcion= req.body;

        const congreso = await db.Congreso.findOne({ where: { Id: inscripcion.IdCongreso, Activo: true } });
        if (!congreso) {
            return res.status(400).send({ mensaje: "IdCongreso no existe o no está activo" });
        }
        const participante = await db.Participantes.findOne({ where: { Id: inscripcion.IdParticipante, Activo: true } });
        if (!participante) {
            return res.status(400).send({ mensaje: "IdParticipante no existe o no está activo" });
        }
        const nuevaInscripcion = await db.Inscripciones.create({
            IdCongreso: inscripcion.IdCongreso,
            IdParticipante: inscripcion.IdParticipante,
            FechaInscripcion: inscripcion.FechaInscripcion,
            EstadoInscripcion: inscripcion.EstadoInscripcion,
            
            
        });
        res.status(201).json(nuevaInscripcion);
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensaje: "Error al crear la inscripcion" });
    }
});

router.put("/inscripcion/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const datosActuales = req.body;

        const inscripcion = await db.Inscripciones.findByPk(id);
        if (!inscripcion) {
            res.status(404).send({ mensaje: "inscripcion no encontrada" });
        } 
        

            const actualizarInscripcion = await db.Inscripciones.update(
                {
                    
                    EstadoInscripcion: datosActuales.EstadoInscripcion,
                    FechaInscripcion: datosActuales.FechaInscripcion
                },
                {
                    where: {
                        Id : id
                    },
                }
            );
            res.status(200).send({mensaje: "Inscripcion actualizada"});
        
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar la Inscripcion" });
    }
});

module.exports = router;