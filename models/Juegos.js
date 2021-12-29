const { Schema, model } = require("mongoose");

const JuegosSchema = Schema({
    id:{
        type: String,
        required:true,
        unique:true,
    },
    nombre:{
        type: String,
        required:true,
    },
    descripcion:{
        type: String,
        required:true,
    },
    sku:{
        type: String,
        required:true,
    },
    categoria:{
        type: String,
        required:true,
    },
    idioma:{
        type: String,
        required:true,
    },
    njugadores:{
        type: String,
        required:true,
    },
    edad:{
        type: String,
        required:true,
    },
    precio:{
        type: String,
        required:true,
    },
    tiempo:{
        type: String,
        required:true,
    },
    compania:{
        type: String,
        required:true,
    },
    alt_img:{
        type:String,
        require:false,
    }

});

module.exports = model('Juegos',JuegosSchema);