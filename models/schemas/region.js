var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var regionSchema = new Schema();
regionSchema.add({
    nom: String,
    loc: {
        type: String,
        coordinates: [Number]
    },
    pays: {
        type: Number,
        ref: "pays"
    },
    idOldDb: Number,
    pop: Number,
    code: Number
});
regionSchema.plugin(autoIncrement.plugin, {model: 'Region'});
module.exports = regionSchema;