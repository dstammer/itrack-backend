var utils = require('../../../utils');

module.exports = function (opts) {
    var reminderModel = opts.models.Reminder;
        
    return {
        "post#reminder/create" : function (req, res) {
            var site = req.body.site,
				isOn = req.body.isOn,
				startDate = req.body.startDate,
				endDate = req.body.endDate,
				startTime = req.body.startTime,
				endTime = req.body.endTime,
				interval = req.body.interval;
                            
			var query = reminderModel.findOne({site : site});
            query.exec(function (err, reminder) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false, error : "Internal server error" });
                } else if (reminder) {
					
                } else {
					reminder = new reminderModel();
				}

				reminder.site = site;
				reminder.isOn = isOn;
				reminder.startDate = startDate;
				reminder.endDate = (endDate)?endDate:"";
				reminder.startTime = startTime;
				reminder.endTime = (endTime)?endTime:"";
				reminder.interval = interval;
				
				reminder.save(function (err, reminder) {
					if (err) {
						console.log(err);
						return res.json({ success : false, error : "Internal server error" });
					} else {
						return res.json({ success : true });
					}
				});
            });
        },

		"post#reminder/get" : function( req, res) {
			var site = req.body.site;
			reminderModel.findOne({site : site}, function(err, reminder){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					return res.json({ success : true, reminder : reminder });
				}
			});
		}
    }
}