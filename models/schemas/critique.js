var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var critiqueSchema = new Schema({
    message: String,
    note: Number,
    visibility: {
        type: String, enum: ["public", "prive"]
    },
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    affiche: {
        restaurant: {type: Schema.Types.ObjectId, ref: "Restaurant"}
    },
    dateVisited: Date,
    dateCreation: Date,
    heure: {
        type: String, enum: ['midi', 'soir']
    },
    groupeMots: {
        type: Schema.Types.ObjectId, ref: "GroupesMots"
    },
    mots: [String],
    participants: String,
    userName: String
});

module.exports = critiqueSchema;