const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Mostrar todos las salas
router.get("/sala", async (_, res) => {
    try {
        const salas = await db.Salas.findAll({});
        if (salas === null || salas.length === 0) {
            res.status(404).send({ mensaje: "No se encontraron salas" });
        } else {
            res.json(salas);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: "Error interno al buscar salas" });
    }
});

//Filtrar Sala por ID
router.get("/sala/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const sala = await db.Salas.findOne({
            where: {
                Id:id
            }
        });
        if (!sala) {
            res.status(404).send({mensaje: "Sala no encontrada"});
        } else {
            res.json(sala);
        } 

    } catch (error) {
        res.status(500).send({mensaje: "Error al buscar sala"})
    }
});

router.put("/sala/e/:id", async (req, res) => {
    try {
        const id = req.params.id;
      
        const sala = await db.Salas.findOne({
            where: {
                Id: id,
                Activo: true
            }
        });
        
        if (!sala) {
            res.status(404).send({ mensaje: "sala no encontrada" });
        } else {
            sala.Activo = false
            await sala.save();
            res.json(sala);
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar la sala" });
    }
});

//Eliminar elemento

router.delete("/sala/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.Salas.destroy({
            where: {
                Id: id
            }
        });

        if (result === 0) {
            res.status(404).send({ mensaje: "sala no encontrada" });
        } else {
            res.status(200).send({ mensaje: "sala eliminada exitosamente" });
        }
        
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar la sala" });
    }
});


router.post("/sala", async (req, res) => {
    try {
        const sala= req.body;
        const nuevaSala = await db.Salas.create({
            NombreSala:sala.NombreSala,
            Capacidad: sala.Capacidad
        });
        res.status(201).json(nuevaSala);
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensaje: "Error al crear la sala" });
    }
});


router.put("/sala/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const datosActuales = req.body;
        const sala = await db.Salas.findByPk(id);
        if (!sala) {
            res.status(404).send({ mensaje: "sala no encontrada" });
        } else {
            const actualizarsala = await db.Salas.update(
                {
                    NombreSala:datosActuales.NombreSala,
                    Capacidad: datosActuales.Capacidad
                },
                {
                    where: {
                        Id : id,
                        Activo : true
                    },
                }
            );
            res.status(200).send({mensaje: "sala actualizada"});
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar la sala" });
    }
});


module.exports = router;