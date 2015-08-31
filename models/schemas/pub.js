var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pubSchema = new Schema();
pubSchema.add({
    label: String,
    image: String,
    format: String,
    pro: {type: Schema.Types.ObjectId, ref: "User"},
    datesCampagne: String,
    dateDebutCampagne: String,
    dateFinCampagne: String,
    dateCreation: Date,
    etat: String,
    locs: [{
        contentType: String,
        departement: {type: Number},
        region: {type: Number},
        pays: {type: String}
    }],
    images: [{
        path: String,
        url: String
    }],
    compteurAffichage: {type: Number, default: 0},
    poidsAffichage: {type: Number, default: 0},
    statu: {
        value: {
            type: String,
            enum: ["EN_COURS_MODIFICATIONS", "PRET_A_PAYER", "EN_ATTENTE_PAIEMENT", "PAYEE", "EN_COURS_VALIDATION", "VALIDEE", "REJETEE"],
            default: "EN_COURS_MODIFICATIONS"
        },
        dateStatu: {
            type: Date,
            default: Date.now
        }
    },
    status: [{
        value: {
            type: String,
            enum: ["EN_COURS_MODIFICATIONS", "PRET_A_PAYER", "EN_ATTENTE_PAIEMENT", "PAYEE", "EN_COURS_VALIDATION", "VALIDEE", "REJETEE"],
            default: "EN_COURS_MODIFICATIONS"
        },
        dateStatu: {
            type: Date,
            default: Date.now
        }
    }],
    prix: Number

});

module.exports = pubSchema;
