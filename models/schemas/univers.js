var mongoose = require('mongoose');
var Schema = mongoose.Schema;

universSchema =  new Schema({
	nom:  {
		type: String,
		index:{unique:true, sparse: true}
	},
	searchMenu : {
		type :Number,
		ref:"MenuItem"
	}
});
module.exports = universSchema;