var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var panierSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    name: String,
    comment: String,
    dateCreation: Date,
    criteres: [{
        contentType: String,
        menuItemId: String,
        attribut: {type: Number, ref: "Attribut"},
        cuisine: {type: Number, ref: "CuisineDuMonde"},
        lieu: {
            category: String,
            value: String
        },
        area: {
            lat: Number,
            lng: Number,
            radius: Number
        }
    }]
});

module.exports = panierSchema;


 