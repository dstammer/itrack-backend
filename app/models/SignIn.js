var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		site : {
            type: mongoose.Schema.ObjectId,
            ref: "Site"
		},
		isDefault : {
			type: String
		},
		trade : {
			type: String
		},
		questionnaire : {
			type: String
		},
		hazards : {
			type: String
		},
		induction : {
			type: String
		},
		evacuation : {
			type: String
		},
		documents : {
			type: String
		},
		enabled : {
			type: String
		}
    });
    
    return Schema;
}