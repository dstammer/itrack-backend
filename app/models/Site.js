var mongoose = require("mongoose");

module.exports = function (opts) {
    var Schema = mongoose.Schema({
        name : {
            type: String,
            required: true
        },
		company : {
            type: mongoose.Schema.ObjectId,
            ref: "Company"
		},
		startDate : {
			type: String,
			required: true
		},
		endDate : {
			type: String,
			required: true
		},
		openTime : {
			type: String,
			required: true
		},
		closeTime : {
			type: String,
			required: true
		},
		createdAt : {
			type : Number
		},
		address : {
			type: String,
			required: true
		},
		suburb : {
			type: String,
			required: true
		},
		city : {
			type: String,
			required: true
		},
		postcode : {
			type: String,
			required: true
		},
		lat : {
			type: String,
			required: true
		},
		lng : {
			type: String,
			required: true
		},
		inspection : {
			type: String
		},
		notice : {
			type: String
		},
		documents : {
			type: String
		},
		rule : {
			type: String
		},
    });
    
    return Schema;
}