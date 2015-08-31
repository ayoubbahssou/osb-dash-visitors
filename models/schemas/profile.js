/**
 * Created by dark0s on 26/05/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema();
profileSchema.add({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    humeur: [String],
    phone: {
        typePhone: [String],
        os: [String]
    },
    fai: [String],
    age: String,
    frequentation: {
        creneaux: [String],
        mode: String
    },
    preference: {
        restaurants: [{
            idRestuarant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
            nom: String,
            ville: String
        }],
        plats: [{
            idPlats: {type: Number, ref: 'Attribut'},
            label: String
        }],
        options: [{
            idPlats: {type: Number, ref: 'Attribut'},
            label: String
        }],
        cuisines: [{
            idPlats: {type: Number, ref: 'CuisineDuMonde'},
            label: String
        }],
        paiement: [String]
    },
    infoRestaurant: {
        nbCouvert: Number,
        horaire: {
            start: String,
            end: String
        },
        saison: [String],
        siteRef: [String]
    }
});
module.exports = profileSchema;