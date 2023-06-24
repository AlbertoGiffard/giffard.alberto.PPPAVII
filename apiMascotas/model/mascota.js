const {Schema, model } = require('mongoose');

const mascotaSchema = new Schema({
    nombre: String,
    tipo: String,
    edad: Number,
    vacunado: Boolean,
    observaciones: String
});

mascotaSchema.set("toJSON", {
    transform: (document, MascotaJSON) => {
        MascotaJSON.id = document._id.toString();
        delete MascotaJSON._id;
        delete MascotaJSON.__v;
    }
})

const Mascota = new model("Mascota", mascotaSchema);

module.exports = {
    Mascota
};