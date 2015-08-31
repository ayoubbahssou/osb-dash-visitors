/**
 * Created by dark0s on 04/05/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commandSchema = new Schema();
commandSchema.add({
    owner: {type: Schema.Types.ObjectId, ref: 'Users'},
    created: {type: Date, default: Date.now},
    tax: Number,
    taxRate: {type: Number, default: 20},
    subTotal: Number,
    totalCost: Number,
    paymentId: String,
    items: [
        {
            quantity: Number,
            total: Number,
            pack: {
                type: Number,
                ref: 'Pack'
            }
        }
    ],
    expired: Date,
    totalPoints: Number,
    uuid: String,
    status: {
        dateStatu: Date,
        value: {
            type: String
        }
    }
});
module.exports = commandSchema;