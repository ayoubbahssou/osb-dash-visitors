var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
cuisineSchema = new Schema({
    label: String,
    image: String,
    isRoot: Boolean,
    parent: Number,
    coords: String
});
cuisineSchema.plugin(autoIncrement.plugin, {model: 'CuisineDuMonde'});
module.exports = cuisineSchema;