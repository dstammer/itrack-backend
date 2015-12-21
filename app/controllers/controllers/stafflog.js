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

				if(log && log.type == type){
					if(type == "IN") return res.json({success : false, error : "A staff with the same SiteSafe Passport is already signed in."});
					else return res.json({success : false, error : "A staff with the same SiteSafe Passport is already signed out."});
				}

				var stafflog = new staffLogModel();
				stafflog.type			= type;
				stafflog.sitesafe		= sitesafe;
				stafflog.timestamp		= (timestamp)?timestamp * 1000:new Date().getTime();
				stafflog.trade			= staff.trade;
				stafflog.questions		= staff.questions;
				stafflog.hazards		= staff.hazards;
				stafflog.hazardsText	= staff.hazardsText;
				stafflog.induction		= staff.induction;
				stafflog.evacutation	= staff.evacuation;
				stafflog.documents		= staff.documents;

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
					
					var returnValue = [];
					for(var i = 0; i < logs.length; i++){
						var log = {};

						log.sitesafe = logs[i].sitesafe;
						log.timestamp = logs[i].timestamp;
						log.type = logs[i].type;
						log.trade = logs[i].trade;

						try
						{
							log.questions = JSON.parse(logs[i].questions);
						}
						catch (e)
						{
							log.questions = {};
						}
						
						log.hazards = logs[i].hazards;
						log.hazardsText = logs[i].hazardsText;
						log.induction = logs[i].induction;
						log.evacuation = logs[i].evacuation;

						try
						{
							log.documents = JSON.parse(logs[i].documents);
						}
						catch (e)
						{
							log.documents = {};
						}

						returnValue.push(log);
					}
					return res.json({ success : true, logs : returnValue });
				}
			});
		}
    }
}