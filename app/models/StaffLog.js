var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		sitesafe : {
			type : String
		},
		timestamp : {
            type: Number
		},
		type : {
            type: String
		},
		trade : {
            type: String
		},
		questions : {
            type: String
		},
		hazards : {
            type: String
		},
		hazardsText : {
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
		}
    });
    
    return Schema;
}