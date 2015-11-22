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
		}
    });
    
    return Schema;
}