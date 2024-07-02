const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Mostrar todos las evaluaciones
router.get("/evaluacion", async (_, res) => {
    try {
        const evaluaciones = await db.Evaluaciones.findAll({});
        if (evaluaciones === null || evaluaciones.length === 0) {
            res.status(404).send({ mensaje: "No se encontraron evaluaciones" });
        } else {
            res.json(evaluaciones);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: "Error interno al buscar evaluaciones" });
    }
});

//Filtrar por congreso

router.get("/evaluacion/congreso/:filtro", async(req, res) => {
    try {
        const congreso = req.params.filtro;
        console.log("Filtro recibido", congreso);
        const evaluacion = await db.Evaluaciones.findAll({
            where: {
                IdCongreso: congreso,
            },
        });
    if (evaluacion.length === 0) {
        res.status(404).send({ mensaje: "Evaluacion no encontrada"});
    } else{
        res.json(evaluacion);
    }
    } catch (error) {
        console.log(error)
        res.status(500).send({mensaje: "Error interno"})
    }
});

//Filtrar Evaluaciones por ID
router.get("/evaluacion/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const evaluacion = await db.Evaluaciones.findOne({
            where: {
                Id:id
            }
        });
        if (!evaluacion) {
            res.status(404).send({mensaje: "Evaluacion no encontrada"});
        } else {
            res.json(evaluacion);
        } 

    } catch (error) {
        res.status(500).send({mensaje: "Error al buscar evaluacion"})
    }
});

//Eliminar elemento

router.delete("/evaluacion/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.Evaluaciones.destroy({
            where: {
                Id: id
            }
        });

        if (result === 0) {
            res.status(404).send({ mensaje: "Evaluación no encontrada" });
        } else {
            res.status(200).send({ mensaje: "Evaluación eliminada exitosamente" });
        }
        
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar la evaluación" });
    }
});

router.post("/evaluacion", async (req, res) => {
    try {
        const evaluacion= req.body;
        const nuevaEvaluacion = await db.Evaluaciones.create({
            IdCongreso: evaluacion.IdCongreso,
            IdParticipante: evaluacion.IdParticipante,
            Puntuacion: evaluacion.Puntuacion,
            Comentarios : evaluacion.Comentarios,
            Fecha: evaluacion.Fecha
        });
        res.status(201).json(nuevaEvaluacion);
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensaje: "Error al crear la evaluación" });
    }
});

router.put("/evaluacion/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const datosActuales = req.body;
        const evaluacion = await db.Evaluaciones.findByPk(id);
        if (!evaluacion) {
            res.status(404).send({ mensaje: "Evaluación no encontrada" });
        } else {
            const actualizarEvaluacion = await db.Evaluaciones.update(
                {
                    IdCongreso: datosActuales.IdCongreso,
                    IdParticipante: datosActuales.IdParticipante,
                    Puntuacion: datosActuales.Puntuacion,
                    Comentarios: datosActuales.Comentarios,
                    Fecha: datosActuales.Fecha,
                },
                {
                    where: {
                        Id : id
                    },
                }
            );
            res.status(200).send({mensaje: "Evaluacion actualizada"});
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar la evaluación" });
    }
});



module.exports = router;