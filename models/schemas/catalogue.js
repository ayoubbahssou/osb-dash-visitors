var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var panierSchema = require("./panier");
var catalogueSchema = new Schema({
    nom: String,
    comment: String,
    user: {type: Schema.Types.ObjectId, ref: "User"},
    dateCreation: Date,
    Affiches: [{
        postIts: [{
            idString: String,
            message: String,
            note: Number
        }],
        restaurant: {type: Schema.Types.ObjectId, ref: "Restaurant"},
        paniers: [Number]
    }],
    Paniers: [panierSchema],
    Recherches: [
        {
            panierIndex: Number,
            affiches: [{type: Schema.Types.ObjectId, ref: "Restaurant"}]
        }
    ],
    SortArray: [{type: Schema.Types.ObjectId, ref: "Restaurant"}],
    currentPage: Number
});
module.exports = catalogueSchema;