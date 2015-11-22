var utils = require('../../../utils');

module.exports = function (opts) {
    var passportModel = opts.models.Passport;
        
    return {
        "post#passport/create" : function (req, res) {
            var sitesafe = req.body.sitesafe,
				site = req.body.site;

			var passport = new passportModel();
			passport.sitesafe = sitesafe;

			passport.save(function(err, nlog){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				}

				return res.json({success : true});
			});
        },

		"post#passport/get" : function( req, res ) {
			passportModel.find({}).exec(function( err, passports ){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					return res.json({ success : true, passports : passports });
				}
			});
		}
    }
}