const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Mostrar todos las inscripciones
router.get("/patrocinador", async (_, res) => {
    try {
        const patrocinadores = await db.Patrocinadores.findAll({});
        if (patrocinadores === null || patrocinadores.length === 0) {
            res.status(404).send({ mensaje: "No se encontraron patrocinadores" });
        } else {
            res.json(patrocinadores);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: "Error interno al buscar patrocinadores" });
    }
});


router.get("/patrocinador/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const patrocinador = await db.Patrocinadores.findOne({
            where: {
                Id:id
            }
        });
        if (!patrocinador) {
            res.status(404).send({mensaje: "Patrocinador no encontrado"});
        } else {
            res.json(patrocinador);
        } 

    } catch (error) {
        res.status(500).send({mensaje: "Error al buscar Patrocinador"})
    }
});

router.put("/patrocinador/e/:id", async (req, res) => {
    try {
        const id = req.params.id;
      
        const patrocinador = await db.Patrocinadores.findOne({
            where: {
                Id: id,
                Activo: true
            }
        });
        
        if (!patrocinador) {
            res.status(404).send({ mensaje: "patrocinador no encontrado" });
        } else {
            patrocinador.Activo = false
            await patrocinador.save();
            res.json(patrocinador);
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar el patrocinador" });
    }
});

router.delete("/patrocinador/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.Patrocinadores.destroy({
            where: {
                Id: id
            }
        });

        if (result === 0) {
            res.status(404).send({ mensaje: "patrocinador  no encontrado" });
        } else {
            res.status(200).send({ mensaje: "ppatrocinador eliminado exitosamente" });
        }
        
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar patrocinador" });
    }
});

router.post("/patrocinador", async (req, res) => {
    try {
        const patrocinador= req.body;
        const nuevopatrocinador = await db.Patrocinadores.create({
            Nombre:patrocinador.Nombre,
            Descripcion: patrocinador.Descripcion,
            Email:patrocinador.Email,
            Telefono :patrocinador.Telefono
    
        });
        res.status(201).json(nuevopatrocinador);
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensaje: "Error al crear nuevo patrocinador" });
    }
})

router.put("/patrocinador/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const datosActuales = req.body;
        const patrocinador = await db.Patrocinadores.findByPk(id);
        if (!patrocinador) {
            res.status(404).send({ mensaje: "patrocinador no encontrado" });
        } else {
            const actualizarpatrocinador = await db.Patrocinadores.update(
                {
                    Nombre:datosActuales.Nombre,
                    Descripcion: datosActuales.Descripcion,
                    Email:datosActuales.Email,
                    Telefono:datosActuales.Telefono
                },
                {
                    where: {
                        Id : id,
                        Activo : true
                    },
                }
            );
            res.status(200).send({mensaje: "patrocinador actualizado"});
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar patrocinador" });
    }
});



module.exports = router;