var mongoose = require('mongoose');
var  autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var villeSchema = new Schema({
	nom: String,
	cp : Number,
	loc: {
	   	type: { type: String},
		coordinates:[Number]
	 },
	departement : {
		type: Number,
		ref: "Departement"
	},
	region : {
		type: Number,
		ref :"Region"
	},
	pays :  {type:Number,
		ref :"Pays"
	},
	idOldDb : Number
});

villeSchema.plugin(autoIncrement.plugin,{model:'Ville'});
module.exports = villeSchema;