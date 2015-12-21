var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		site : {
            type: mongoose.Schema.ObjectId,
            ref: "Site"
		},
		document : [{
			type: String,
			required: true
		}],
		required : {
			type: String,
		},
		updatedAt : {
			type : Number
		},
		createdAt : {
			type : Number
		}
    });
    
    return Schema;
}