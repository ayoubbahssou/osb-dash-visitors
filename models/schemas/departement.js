var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var departementSchema = new Schema();
departementSchema.add({
    nom: String,
    loc: {
        type: {type: String},
        coordinates: [Number]
    },
    region: {type: Number, ref: "region"},
    pays: {type: Number, ref: "pays"},
    idOldDb: Number,
    code_dep: String,
    path: String,
    pop: Number
});

departementSchema.plugin(autoIncrement.plugin, {model: 'Departement'});
module.exports = departementSchema;