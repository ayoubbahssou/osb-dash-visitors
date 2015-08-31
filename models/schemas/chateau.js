var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chateauSchema = new Schema();
chateauSchema.add({
    etiquette: String,
    proprietaire: String,
    appelations: [String],
    ville: String,
    pays: String,
    region: String,
    classement: String
});

module.exports = chateauSchema;