const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Productos = new Schema({
    categoria: String,
    nombre: String,
    precio: Number,
    cover: String
});

module.exports = mongoose.model('producto', Productos);