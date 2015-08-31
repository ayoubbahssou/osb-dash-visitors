var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema();
userSchema.add({
    login: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    pseudo: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    password: String,
    salt: String,
    nom: String,
    prenom: String,
    mail: String,
    affiches: [{
        afficheId: String,
        universId: String
    }],
    codepostal: String,
    ville: String,
    pays: String,
    role: Number,
    active: Boolean,
    suspendu: Boolean,
    expirationDate: Date,
    birthday: Date,
    mobile: String,
    sexe: {type: String, enum: ['H', 'F']},
    callcenter: {
        type: Schema.Types.ObjectId,
        ref: 'Callcenter'
    },
    lastConnexion: {
        date: Date,
        ip: String
    },
    lastLogout: Date,
    connected: {type: Boolean, default: false},
    packCredit: [{
        created: {type: Date, default: Date.now},
        expired: {type: Date, default: Date.now},
        numbPoints: Number,
        command: {type: Schema.Types.ObjectId, ref: 'Command'}
    }],
    operator: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = userSchema;