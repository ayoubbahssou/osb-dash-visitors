/**
 * Created by dark0s on 06/05/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gridSchema = new Schema();
gridSchema.add({
    owner : {type:Schema.Types.ObjectId,ref:'User'},
    restaurant:{type: Schema.Types.ObjectId, ref: 'Restaurant'},
    created: {type: Date, default: Date.now},
    updated: Date,
    positions: [{
        price: Number,
        updated: Date,
        expired: Date,
        dateConfig: Date,
        reserved: {type: Boolean, default: false},
        image : {
            src: String,
            title: String
        }
    }]
});
module.exports = gridSchema;
