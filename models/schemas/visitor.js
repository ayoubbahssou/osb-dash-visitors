/**
 * Created by dark0s on 30/03/15.
 */
var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var visitorSchema = new Schema();
visitorSchema.add({
    visitDate: {
        type: Date,
        default: Date.now
    },
    ip: String,
    userAgent: Schema.Types.Mixed,
    geo: Schema.Types.Mixed,
    originalUrl: String
});
visitorSchema.plugin(autoIncrement.plugin, 'Visitor');
module.exports = visitorSchema;