const mongoose = require('mongoose');
const express = require("express");
const mascotasRouter = express.Router();
const { Mascota } = require("../model/mascota");
const { Tipo } = require("../model/tipo");
const { verifyToken } = require("../utils/middlewares");
const { ObjectId } = require('mongodb');

//agrego el middleware como segundo parametro
mascotasRouter.get("/", verifyToken, (req, res, next) => {
    Mascota.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        })
})

mascotasRouter.get("/tipos", (req, res, next) => {
    Tipo.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            next(err);
        })
})
mascotasRouter.get("/:id", (req, res, next) => {
    const id = req.params.id;

    Mascota.findById(id)
        .then((per) => {
            if (per) {
                res.json(per);
            }

            res.status(404).end();
        })
        .catch((err) => {
            next(err);
        })
})

mascotasRouter.delete("/:id", (req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;
    const id = req.params.id;
    let objectId = id;
    if (!ObjectId.isValid(id)) {
        // Convierte la cadena de texto en ObjectId
        objectId = mongoose.Types.ObjectId(id);
    }

    Mascota.findByIdAndDelete(objectId)
        .then((masc) => {
            if (masc) {
                res.status(204).end();
            }

            res.status(404).end();
        })
        .catch((err) => {
            next(err);
        })
})

mascotasRouter.post("/", (req, res, next) => {
    const { nombre, tipo, edad, vacunado, observaciones } = req.body;

    const nuevaMascota = new Mascota({ nombre, tipo, edad, vacunado, observaciones });

    nuevaMascota.save()
        .then((masc) => {
            res.json(masc);
        })
        .catch((err) => {
            next(err);
        })

})

mascotasRouter.put("/:id", (req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;
    const id = req.params.id;
    let objectId = id;
    const { nombre, tipo, edad, vacunado, observaciones } = req.body;
    if (!ObjectId.isValid(id)) {
        // Convierte la cadena de texto en ObjectId
        objectId = mongoose.Types.ObjectId(id);
    }

    //new:true trae el nuevo
    Mascota.findByIdAndUpdate(objectId, { nombre, tipo, edad, vacunado, observaciones }, { new: true })
        .then((masc) => {
            if (masc) {
                res.json(masc);
            }

            res.status(404).end();
        })
        .catch((err) => {
            console.log(err.message)
            next(err);
        })

});


module.exports = mascotasRouter;