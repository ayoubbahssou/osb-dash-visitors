var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var configurationSchema = new Schema();
configurationSchema.add({
    pub: {
        jourCouleur: [{
            couleur: String,
            value: Number,
            reduction: [{
                debut: Number,
                fin: Number,
                value: Number
            }]
        }],
        franceHT: Number

    },
    pvparhabitant: Number,
    prixPhoto: Number,
    pvhorsHT: Number,
    tempsEntreDeuxCritiques: Number,
    catalogueTailleMax: Number,
    rechercheTailleMax: Number,
    recherchesAvantTri: Number,

    ratioPubs: {
        Pays: {
            region: Number,
            departement: Number,
            pays: Number
        },
        Regions: {
            region: Number,
            departement: Number,
            pays: Number
        },
        Departements: {
            region: Number,
            departement: Number,
            pays: Number
        }
    },
    requireUserLogin: Boolean,
    registrationEnabled: Boolean,
    demoAuthEnabled: Boolean,
    pochetteMag: {type: String, default: "/images/magazine_couverture.png"},
    badWords: {type: String, default: ""},
    imagesGratuites: {type: Number, default: 3},
    grille: {
        grillePlat: [Number],
        grilleInfosTechnique: [Number]
    }

});
configurationSchema.plugin(autoIncrement.plugin, 'Configuration');
module.exports = configurationSchema;
 