var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var menuItemSchema = new Schema({
    parent: {type: Number, ref: "MenuItem"},
    root: {type: Number, ref: "MenuItem"},
    order: Number,
    label: String,
    image: String,
    contentType: String,
    nodeType: String,
    critere: {
        contentType: String,
        attribut: {type: Number, ref: "attributs"},
        cuisine: {type: Number, ref: "CuisineDuMonde"}
    }
});
menuItemSchema.plugin(autoIncrement.plugin, 'MenuItems');
module.exports = menuItemSchema;