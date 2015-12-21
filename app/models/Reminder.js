var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		isOn : {
			type: String,
			required: true
		},
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
		startTime : {
			type: String,
			required: true
		},
		endTime : {
			type: String,
		},
		interval : {
			type: Number
		},
    });
    
    return Schema;
}