const {Schema, model } = require('mongoose');

const tipoSchema = new Schema({
    descripcion: String
});

tipoSchema.set("toJSON", {
    transform: (document, TipoJSON) => {
        TipoJSON.id = document._id.toString();
        delete TipoJSON._id;
        delete TipoJSON.__v;
    }
})

const Tipo = new model("Tipo", tipoSchema);

module.exports = {
    Tipo
};