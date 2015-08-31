var mongoose = require('mongoose');
var Schema = mongoose.Schema;

motSchema = new Schema({
    nom: String,
    isActive: Boolean,
    mots: [{
        label: String,
        ponderation: Number
    }]

});
module.exports = motSchema;