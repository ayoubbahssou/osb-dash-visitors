var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var restaurantSchema = new Schema({}, {strict: false});
//var thingSchema = new Schema({..}, { strict: false });

restaurantSchema.add({
    nom: String,
    description: String,
    dateCreation: {
        type: Date,
        default: Date.now
    },
    dateModificationDescription: Date,
    dateModificationRestaurant: Date,
    dateModificationRestaurantControler: Date,
    telephone: String,
    mail: String,
    siteWeb: String,
    motPatron: String,
    commentaire: String,
    logo: {
        url: String
    }
    , adresse: {
        body: String,
        cp: Number,
        ville: String,
        departement: String,
        region: String,
        lat: String,
        lng: String,
        pays: String,
        loc: {
            type: {
                type: String
            },
            coordinates: {
                type: [Number],
                index: '2dsphere'
            }
        }
    },
    ville: {type: Number, ref: "departement"},
    departement: {type: Number, ref: "departement"},
    region: {type: Number, ref: "region"},
    menus: [{
        prix: Number,
        entrees: [String],
        plats: [String],
        desserts: [String],
        prix_enfant: Number,
        isMenuEnfant: Boolean,
        titre: String,
        vinCompris: Boolean,
        cafeCompris: Boolean
    }],
    Specialites: [{
        value: {
            type: Number,
            ref: "attributs"
        },
        label: String
    }],
    Plats: [{
        value: {type: Number, ref: "attributs"},
        label: String
    }],
    InfosTechniques: [{
        value: {type: Number, ref: "attributs"},
        label: String
    }],
    InfosTechniquesText: String,
    subscribedOptions: [{
        option: {type: Schema.Types.ObjectId, ref: 'Option'},
        subscribedDate: Date,
        expirationDate: Date,
        status: String
    }],
    accepteAnimaux: Boolean,
    hasTerrasse: Boolean,
    hasPiscine: Boolean,
    accessHandicape: Boolean,
    accepteCarteCredit: Boolean,
    reserveVin: Boolean,
    prix: [{value: Number, label: String}],
    image: String,
    provenance: String,
    operateur: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    controler: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    callcenter: {
        type: Schema.Types.ObjectId,
        ref: 'Callcenter'
    },
    hotesse: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commercial: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateAffectationOperateur: Date,
    affected: Boolean,
    statu: Number,
    dateRdv: Date,
    moduleId: Number,
    cuisines: [{
        value: Number,
        label: String
    }],
    platsdistLibres: [{value: String}],
    grillePlatsLibres: [{
        value: String,
        prix: {type: Number, default: 0},
        position: {type: Number, default: 0},
        publier: {type: String, default: "N"},
        image: {
            src: String,
            position: {type: Number, default: 0}
        },
        statu: {
            dateStatu: Date,
            value: {
                type: String,
                enum: ["EN_COURS_MODIFICATIONS", "EN_ATTENTE_PAIEMENT", "PAYEE", "EN_COURS_VALIDATION", "VALIDEE", "EXPIREE"],
                default: "EN_COURS_MODIFICATIONS"
            }
        }
    }],
    platsLibres: [{value: String}],
    specialiteLibres: [{
        value: String,
        publier: {type: String, default: "Y"}
    }],
    ambiancesLibres: [{value: String}],
    environnementsLibres: [{value: String}],
    animationsLibres: [{value: String}],
    infosTechsLibres: [{value: String}],
    critique: {type: Schema.Types.ObjectId, ref: 'Critiques'},
    critiqueUpdated: Date,
    pro: {type: Schema.Types.ObjectId, ref: 'User'},
    vins: [{
        appelation: String,
        couleur: String,
        prixVerre: Number,
        millesisme: Number,
        prixDemiBouteille: Number,
        prixBouteille: Number,
        etiquette: String,
        proprietaire: String,
        appelations: [String],
        ville: String,
        pays: String,
        region: String,
        classement: String
    }],
    Template: {
        Id: Number,
        thumbs: [{
            src: String,
            imageId: String
        }]
    },
    statutValidation: {
        dateStatutValidation: {
            type: Date,
            default: Date.now
        },
        value: {
            type: String,
            enum: ["VALIDE", "NON_VALIDE", "NON_TRAITE"],
            default: "NON_TRAITE"
        }
    },
    Images: [{
        label: String,
        src: String,
        dateCreation: Date,
        position: Number,
        publier: {type: String, default: "N"},
        statu: {
            dateStatu: Date,
            value: {
                type: String,
                enum: ["EN_COURS_MODIFICATIONS", "EN_ATTENTE_PAIEMENT", "PAYEE", "EN_COURS_VALIDATION", "VALIDEE", "EXPIREE"],
                default: "EN_COURS_MODIFICATIONS"
            }
        },
        status: [{
            dateStatu: Date,
            value: {
                type: String,
                enum: ["EN_COURS_MODIFICATIONS", "EN_ATTENTE_PAIEMENT", "PAYEE", "EN_COURS_VALIDATION", "VALIDEE", "EXPIREE"],
                default: "EN_COURS_MODIFICATIONS"
            }
        }
        ],
        tag: String,
        dateExpiration: Date,
        prix: Number
    }],
    imagesOrder: [String],
    imagesGratuitesDisponibles: Number,
    tabsbyPercentage: {
        infosGenerales: Number,
        adresse: Number,
        patron: Number,
        menu: Number,
        plats: Number,
        specialites: Number,
        listeTech: Number
    },
    TotalPercentage: Number,
    pertinence: {
        value: {type: Number, default: 0},
        updateDate: Date
    }
});
module.exports = restaurantSchema;
