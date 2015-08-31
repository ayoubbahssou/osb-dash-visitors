var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema();
tokenSchema.add({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    token: {
        type: String,
        index: {unique: true}
    }
});

module.exports = tokenSchema;
