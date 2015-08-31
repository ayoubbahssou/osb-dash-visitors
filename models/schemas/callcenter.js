var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var callcenterSchema = new Schema();

callcenterSchema.add({
    ccname: String,
    adresse: String,
    cp: Number,
    departement: String,
    ville: String,
    pays: String,
    controller: {type: Schema.Types.ObjectId, ref: 'User'},
    operateurs: ['User'],
    hotesses: ['User'],
    affectation: {
        cps: [String],
        villes: [String],
        departements: [String],
        regions: [String],
        pays: [String],
        provenance: String
    }
});

module.exports = callcenterSchema;
