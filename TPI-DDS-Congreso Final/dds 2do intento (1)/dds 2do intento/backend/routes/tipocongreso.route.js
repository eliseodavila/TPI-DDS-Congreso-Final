const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

//Mostrar todos los tipos de congreso

router.get("/tipocongreso", async(_,res) => {
    try {
        const tiposcongreso = await db.TipoCongresos.findAll({});
        if (tiposcongreso === null){
            res.status(404).send({mensaje: "Tipos congreso no encontrado"});
        } else {
            res.json(tiposcongreso);
        }

    } catch (error) {
        res.status(500).send({mensaje: "Error interno obteniendo tipos congreso"});
    }
    });

//Filtrar tipo de congresos  por ID
router.get("/tipocongreso/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const tipocongreso = await db.TipoCongresos.findOne({
            where: {
                Id:id
            }
        });
        if (!tipocongreso) {
            res.status(404).send({mensaje: "tipo de congreso no encontrado"});
        } else {
            res.json(tipocongreso);
        } 

    } catch (error) {
        res.status(500).send({mensaje: "Error al buscar tipo de congreso"})
    }
});



router.put("/tipocongreso/e/:id", async (req, res) => {
    try {
        const id = req.params.id;
      
        const tipoCongresos = await db.TipoCongresos.findOne({
            where: {
                Id: id,
                Activo: true
            }
        });
        
        if (!tipoCongresos) {
            res.status(404).send({ mensaje: "tipo de Congreso no encontrado" });
        } else {
            tipoCongresos.Activo = false
            await tipoCongresos.save();
            res.json(tipoCongresos);
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar tipo de Congresos" });
    }
});


router.delete("/tipocongreso/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.TipoCongresos.destroy({
            where: {
                Id: id
            }
        });

        if (result === 0) {
            res.status(404).send({ mensaje: "Tipo Congresos no encontrada" });
        } else {
            res.status(200).send({ mensaje: "Tipo Congresos eliminada exitosamente" });
        }
        
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar TipoC ongresos" });
    }
});



router.post("/tipocongreso", async (req, res) => {
    try {
        const tipocongreso= req.body;
        const nuevotipocongreso = await db.TipoCongresos.create({
            Nombre:tipocongreso.Nombre,
            Descripcion: tipocongreso.Descripcion
        });
        res.status(201).json(nuevotipocongreso);
    } catch (error) {
        console.log(error)
        res.status(500).send({ mensaje: "Error al crear nuevo tipo de congreso" });
    }
});


router.put("/tipocongreso/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const datosActuales = req.body;
        const tipocongreso = await db.TipoCongresos.findByPk(id);
        if (!tipocongreso) {
            res.status(404).send({ mensaje: "tipo de congreso no encontrada" });
        } else {
            const actualizartipocongreso = await db.TipoCongresos.update(
                {
                    Nombre:datosActuales.Nombre,
                    Descripcion: datosActuales.Descripcion
                },
                {
                    where: {
                        Id : id,
                        Activo : true
                    },
                }
            );
            res.status(200).send({mensaje: "tipo de congreso actualizada"});
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error al actualizar tipo de congreso" });
    }
});

module.exports = router;