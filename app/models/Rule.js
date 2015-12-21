var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		site : {
            type: mongoose.Schema.ObjectId,
            ref: "Site"
		},
		next : {
			type: String,
			required: true
		},
		previous : {
			type: String,
		},
    });
    
    return Schema;
}