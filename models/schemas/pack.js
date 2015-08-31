/**
 * Created by dark0s on 07/04/15.
 */
var  autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var packSchema = new Schema();
packSchema.add({
    name: String,
    price: Number,
    numbPoint: Number,
    description: String,
    color: String,
    dateUpdate: {type: Date, default: Date.now}
});
packSchema.plugin(autoIncrement.plugin, 'Pack');
module.exports = packSchema;
