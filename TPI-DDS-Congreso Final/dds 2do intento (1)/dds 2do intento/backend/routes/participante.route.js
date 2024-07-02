const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Mostrar todos las inscripciones
router.get("/participante", async (_, res) => {
    try {
        const participantes = await db.Participantes.findAll({});
        if (participantes === null || participantes.length === 0) {
            res.status(404).send({ mensaje: "No se encontraron participantes" });
        } else {
            res.json(participantes);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: "Error interno al buscar participantes" });
    }
});

//Filtrar Participantes por ID
router.get("/participante/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const participante = await db.Participantes.findOne({
            where: {
                Id:id
            }
        });
        if (!participante) {
            res.status(404).send({mensaje: "Participante no encontrado"});
        } else {
            res.json(participante);
        } 

    } catch (error) {
        res.status(500).send({mensaje: "Error al buscar participante"})
    }
});

router.put("/participante/e/:id", async (req, res) => {
    try {
        const id = req.params.id;
      
        const participante = await db.Participantes.findOne({
            where: {
                Id: id,
                Activo: true
            }
        });
        
        if (!participante) {
            res.status(404).send({ mensaje: "participante no encontrado" });
        } else {
            participante.Activo = false
            await participante.save();
            res.json(participante);
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar el participante" });
    }
});


router.delete("/participante/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.Participantes.destroy({
            where: {
                Id: id
            }
        });

        if (result === 0) {
            res.status(404).send({ mensaje: "participante  no encontrado" });
        } else {
            res.status(200).send({ mensaje: "participante eliminado exitosamente" });
        }
        
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar participante" });
    }
});


router.post("/participante", async (req, res) => {
    try {
        const participante= req.body;
        const nuevoparticipante = await db.Participantes.create({
            NombreParticipante:participante.NombreParticipante,
            ApellidoParticipante: participante.ApellidoParticipante,
            FechaNacimiento:participante.FechaNacimiento,
    
        });
        res.status(201).json(nuevoparticipante);
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensaje: "Error al crear nuevo participante" });
    }
})



router.put("/participante/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const datosActuales = req.body;
        const participante = await db.Participantes.findByPk(id);
        if (!participante) {
            res.status(404).send({ mensaje: "participante no encontrado" });
        } else {
            const actualizarparticipante = await db.Participantes.update(
                {
                    NombreParticipante:datosActuales.NombreParticipante,
                    ApellidoParticipante: datosActuales.ApellidoParticipante,
                    FechaNacimiento: datosActuales.FechaNacimiento,
                },
                {
                    where: {
                        Id : id,
                        Activo : true
                    },
                }
            );
            res.status(200).send({mensaje: "participante actualizado"});
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar participante" });
    }
});

module.exports = router;