const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Mostrar todos los tipos de congreso
router.get("/congreso", async (_, res) => {
    try {
        const congreso = await db.Congreso.findAll({});
        if (congreso === null || congreso.length === 0) {
            res.status(404).send({ mensaje: "No se encontraron tipos de congreso" });
        } else {
            res.json(congreso);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: "Error interno al buscar tipos de congreso" });
    }
});

//Filtrar Congreso por nombre
router.get("/congreso/:nombre", async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const congreso = await db.Congreso.findAll({
            where: {NombreCongreso: { [Op.like]: nombre + "%"  }}
        });
        if (!congreso || congreso.length === 0) {
            res.status(404).send({ mensaje: "Congreso no encontrado" });
        } else {
            res.json(congreso);
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al buscar Congreso" });
    }
});

//Filtrar congreso por ID
router.get("/congreso/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const congreso = await db.Congreso.findOne({
            where: {
                Id:id
            }
        });
        if (!congreso) {
            res.status(404).send({mensaje: "Congreso no encontrado"});
        } else {
            res.json(congreso);
        } 

    } catch (error) {
        res.status(500).send({mensaje: "Error al buscar congreso"})
    }
});


router.put("/congreso/e/:id", async (req, res) => {
    try {
        const id = req.params.id;
      
        const congreso = await db.Congreso.findOne({
            where: {
                Id: id,
                Activo: true
            }
        });
        
        if (!congreso) {
            res.status(404).send({ mensaje: "congreso no encontrada" });
        } else {
            congreso.Activo = false
            await congreso.save();
            res.json(congreso);
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar congreso" });
    }
});
module.exports = router;