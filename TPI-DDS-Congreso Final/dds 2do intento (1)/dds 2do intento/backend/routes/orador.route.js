const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Mostrar todos las inscripciones
router.get("/orador", async (_, res) => {
    try {
        const oradores = await db.Oradores.findAll({});
        if (oradores === null || oradores.length === 0) {
            res.status(404).send({ mensaje: "No se encontraron oradores" });
        } else {
            res.json(oradores);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: "Error interno al buscar oradores" });
    }
});

//Filtrar oradores por ID
router.get("/orador/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const orador = await db.Oradores.findOne({
            where: {
                Id:id
            }
        });
        if (!orador) {
            res.status(404).send({mensaje: "orador no encontrado"});
        } else {
            res.json(orador);
        } 

    } catch (error) {
        res.status(500).send({mensaje: "Error al buscar orador"})
    }
});



router.put("/orador/e/:id", async (req, res) => {
    try {
        const id = req.params.id;
      
        const orador = await db.Oradores.findOne({
            where: {
                Id: id,
                Activo: true
            }
        });
        
        if (!orador) {
            res.status(404).send({ mensaje: "orador no encontrado" });
        } else {
            orador.Activo = false
            await orador.save();
            res.json(orador);
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar el orador" });
    }
});


router.delete("/orador/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.Oradores.destroy({
            where: {
                Id: id
            }
        });

        if (result === 0) {
            res.status(404).send({ mensaje: "orador  no encontrado" });
        } else {
            res.status(200).send({ mensaje: "orador eliminado exitosamente" });
        }
        
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar orador" });
    }
});


router.post("/orador", async (req, res) => {
    try {
        const orador= req.body;
        const nuevoorador = await db.Oradores.create({
            Nombre:orador.Nombre,
            Apellidos: orador.Apellidos,
            Biografia:orador.Biografia,
            Email: orador.Email
        });
        res.status(201).json(nuevoorador);
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensaje: "Error al crear nuevo orador" });
    }
});



router.put("/orador/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const datosActuales = req.body;
        const orador = await db.Oradores.findByPk(id);
        if (!orador) {
            res.status(404).send({ mensaje: "orador no encontrado" });
        } else {
            const actualizarorador = await db.Oradores.update(
                {
                    Nombre:datosActuales.Nombre,
                    Apellidos: datosActuales.Apellidos,
                    Biografia:datosActuales.Biografia,
                    Email: datosActuales.Email
                },
                {
                    where: {
                        Id : id,
                        Activo : true
                    },
                }
            );
            res.status(200).send({mensaje: "orador actualizado"});
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar orador" });
    }
});
module.exports = router;