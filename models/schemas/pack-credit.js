/**
 * Created by dark0s on 10/05/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var packCreditSchema = new Schema();
packCreditSchema.add({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    created: {type: Date, default: Date.now},
    expired: Date,
    numbPoints: Number,
    command: {type: Schema.Types.ObjectId, ref: 'Command'},
    giftLog: {
        operator: {type: Schema.Types.ObjectId, ref: 'User'},
        mail: String,
        dateGift: Date
    }
});
module.exports = packCreditSchema;