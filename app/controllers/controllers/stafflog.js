module.exports = function (opts) {
    var staffLogModel = opts.models.StaffLog;
        
    return {
        "post#stafflogs/create" : function (req, res) {
			var type = req.body.type,
				timestamp = req.body.timestamp,
				sitesafe = req.body.sitesafe;

			console.log('here');
			console.log(req.body);

			staffLogModel.findOne({sitesafe: sitesafe}).sort({timestamp: -1}).limit(1).exec(function(err, log){
				if(err){
					return res.json({success : false, error : "Internal server eror" });
				}

				console.log(log);

				if(log && log.type == type){
					if(type == "IN") return res.json({success : false, error : "A staff with the same SiteSafe Passport is already signed in."});
					else return res.json({success : false, error : "A staff with the same SiteSafe Passport is already signed out."});
				}

				var stafflog = new staffLogModel();
				stafflog.type = type;
				stafflog.sitesafe = sitesafe;
				stafflog.timestamp = (timestamp)?timestamp * 1000:new Date().getTime();

				stafflog.save(function(err, nlog){
					if(err){
						return res.json({ success : false, error : "Internal server error" });
					}

					return res.json({success : true});
				});
			});
        },

		"post#stafflogs/get" : function(req, res) {
			staffLogModel.find({}).sort({timestamp : 1}).exec(function( err, logs ){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					return res.json({ success : true, logs : logs });
				}
			});
		}
    }
}