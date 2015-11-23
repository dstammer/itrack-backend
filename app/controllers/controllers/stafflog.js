var utils = require('../../../utils');

module.exports = function (opts) {
    var staffLogModel = opts.models.StaffLog;
        
    return {
        "post#stafflogs/create" : function (req, res) {
			var type = req.body.type,
				timestamp = req.body.timestamp;

			var stafflog = new staffLogModel();
			stafflog.type = type;
			stafflog.timestamp = (timestamp)?timestamp * 1000:new Date().getTime();

			stafflog.save(function(err, nlog){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				}

				return res.json({success : true});
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