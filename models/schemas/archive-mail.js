/**
 * Created by dark0s on 21/02/15.
 */
var autoIncrement = require('mongoose-auto-increment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var archiveMailSchema = new Schema();
archiveMailSchema.add({
    mail: [String],
    mailContent: String,
    mailObject: {type: String, default: ''},
    sendingDate: Date
});
archiveMailSchema.plugin(autoIncrement.plugin, 'ArchiveMail');
module.exports = archiveMailSchema;