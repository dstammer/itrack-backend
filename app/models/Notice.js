var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		site : {
            type: mongoose.Schema.ObjectId,
            ref: "Site"
		},
		startDate : {
			type: String,
			required: true
		},
		endDate : {
			type: String,
		},
		openTime : {
			type: String,
			required: true
		},
		closeTime : {
			type: String,
		},
		notice : {
			type: String
		},
		createdAt : {
			type : Number
		}
    });
    
    return Schema;
}