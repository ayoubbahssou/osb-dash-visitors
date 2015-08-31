/**
 * Created by dark0s on 30/03/15.
 */
var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mailLogSchema = new Schema();
mailLogSchema.add({
    sendingDate: {
        type: Date,
        default: Date.now
    },
    status: String,
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ip: String,
    email: String,
    subject: String,
    service: {
        type: String,
        enum: ["Local", "SendGrid"]
    }
});
mailLogSchema.plugin(autoIncrement.plugin, 'MailLog');
module.exports = mailLogSchema;