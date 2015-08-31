/**
 * Created by dark0s on 31/05/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var couponSchema = new Schema();
couponSchema.add({
    owner: {type: Schema.Types.ObjectId,ref:'User'},
    restaurant: {type: Schema.Types.ObjectId,ref:'Restaurant'},
    created : {type:Date, default: Date.now},
    label : String,
    description: String,
    publishedDate: {
        startDate: Date,
        endDate: Date
    },
    zone: {
        ville: String,
        departement: String,
        region: String
    },
    uuid: String,
    category: {
        type: {type: String, enum:['Reduction','Offre']},
        property: {
            pourcentage: Number,
            elementOffre: [String]
        }
    },
    backgroudImg: String
});
module.exports = couponSchema;