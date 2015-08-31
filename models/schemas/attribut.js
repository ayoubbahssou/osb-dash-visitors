var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var attributSchema = new Schema();
attributSchema.add({
    isRoot: Boolean,
    label: String,
    parent: {
        type: Number,
        ref: 'Attribut'
    },
    contentType: String,
    isParent: Boolean,
    root: {
        type: Number,
        ref: 'Attribut'
    },
    image: String
});
attributSchema.plugin(autoIncrement.plugin, 'Attribut');
module.exports = attributSchema;
