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
            res.status(404).send({mensaje: "congreso no encontrado"});
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


router.delete("/congreso/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.Congreso.destroy({
            where: {
                Id: id
            }
        });

        if (result === 0) {
            res.status(404).send({ mensaje: "congreso  no encontrado" });
        } else {
            res.status(200).send({ mensaje: "congreso eliminado exitosamente" });
        }
        
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar congreso" });
    }
});


router.post("/congreso", async (req, res) => {
    try {
        const congreso= req.body;

        const sala = await db.Salas.findOne({ where: { Id: congreso.IdSala, Activo: true } });
        if (!sala) {
            return res.status(400).send({ mensaje: "IdSala no existe o no está activo" });
        }

        const tipoCongreso = await db.TipoCongresos.findOne({ where: { Id: congreso.IdTipoCongreso, Activo: true } });
        if (!tipoCongreso) {
            return res.status(400).send({ mensaje: "IdTipoCongreso no existe o no está activo" });
        }
        const patrocinador = await db.Patrocinadores.findOne({ where: { Id: congreso.IdPatrocinador, Activo: true } });
        if (!patrocinador) {
            return res.status(400).send({ mensaje: "IdPatrocinador no existe o no está activo" });
        }
       
        const nuevocongreso = await db.Congreso.create({
            NombreCongreso:congreso.NombreCongreso,
            DescripcionCongreso: congreso.DescripcionCongreso,
            FechaCongreso:congreso.FechaCongreso,
            IdTipoCongreso :congreso.IdTipoCongreso,
            IdSala:congreso.IdSala,
            IdPatrocinador:congreso.IdPatrocinador,
            IdOrador: congreso.IdOrador

    
        });
        res.status(201).json(nuevocongreso);
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensaje: "Error al crear nuevo congreso" });
    }
})

router.put("/congreso/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const datosActuales = req.body;
        const congreso = await db.Congreso.findByPk(id);
        if (!congreso) {
            res.status(404).send({ mensaje: "congreso no encontrado" });}

        const sala = await db.Salas.findOne({ where: { Id: datosActuales.IdSala, Activo: true } });
        if (!sala) {
            return res.status(400).send({ mensaje: "IdSala no existe o no está activo" });
        }

        const tipoCongreso = await db.TipoCongresos.findOne({ where: { Id: datosActuales.IdTipoCongreso, Activo: true } });
        if (!tipoCongreso) {
            return res.status(400).send({ mensaje: "IdTipoCongreso no existe o no está activo" });
        }

        const patrocinador = await db.Patrocinadores.findOne({ where: { Id: datosActuales.IdPatrocinador, Activo: true } });
        if (!patrocinador) {
            return res.status(400).send({ mensaje: "IdPatrocinador no existe o no está activo" });
        }

        const actualizarcongreso = await db.Congreso.update(
                {
                    NombreCongreso:datosActuales.NombreCongreso,
                    DescripcionCongreso: datosActuales.DescripcionCongreso,
                    FechaCongreso:datosActuales.FechaCongreso,
                    IdTipoCongreso :datosActuales.IdTipoCongreso,
                    IdSala:datosActuales.IdSala,
                    IdPatrocinador:datosActuales.IdPatrocinador,
                    IdOrador: datosActuales.IdOrador
                },
                {
                    where: {
                        Id : id,
                        Activo : true
                    },
                }
            );
            res.status(200).send({mensaje: "Congreso actualizado"});
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar Congreso" });
    }
});
module.exports = router;