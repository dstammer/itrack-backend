var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
		sitesafe : {
            type: String
		},
		site : {
			type: mongoose.Schema.ObjectId,
            ref: "Site"
		}
    });
    
    return Schema;
}