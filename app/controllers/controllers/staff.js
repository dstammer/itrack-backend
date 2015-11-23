var utils = require('../../../utils');

module.exports = function (opts) {
    var staffModel = opts.models.Staff;
        
    return {
        "post#staff/create" : function (req, res) {
            var sitesafe = req.body.sitesafe,
				name = req.body.name,
				company = req.body.company,
				mobile = req.body.mobile,
				trade = req.body.trade,
				questions = req.body.questions,
				hazards = req.body.hazards,
				hazardsText = req.body.hazardsText,
				induction = req.body.induction,
				evacuation = req.body.evacuation,
				documents = req.body.documents;
                            
			var query = staffModel.findOne({sitesafe : sitesafe});
            query.exec(function (err, staff) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false, error : "Internal server error" });
                } else if (staff) {
					
                } else {
					staff = new staffModel();
				}

				staff.sitesafe = sitesafe;
				if(name) staff.name = name;
				if(company) staff.company = company;
				if(mobile) staff.mobile = mobile;
				if(trade) staff.trade = trade;
				if(questions) staff.questions = JSON.stringify(questions);
				if(hazards) staff.hazards = hazards;
				if(hazardsText) staff.hazardsText = hazardsText;
				if(induction) staff.induction = induction;
				if(evacuation) staff.evacuation = evacuation;
				if(documents) staff.documents = JSON.stringify(documents);

				staff.save(function (err, nstaff) {
					if (err) {
						console.log(err);
						return res.json({ success : false, error : "Internal server error" });
					} else {
						return res.json({ success : true });
					}
				});
            });
        },

		"post#staff/get" : function( req, res) {
			staffModel.find({}).exec(function( err, staffs ){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					var returnValue = [];
					for(var i = 0; i < staffs.length; i++){
						var staff = {};

						staff.sitesafe = staffs[i].sitesafe;
						staff.name = staffs[i].name;
						staff.company = staffs[i].company;
						staff.mobile = staffs[i].mobile;
						staff.trade = staffs[i].trade;

						try
						{
							staff.questions = JSON.parse(staffs[i].questions);
						}
						catch (e)
						{
							staff.questions = {};
						}
						
						staff.hazards = staffs[i].hazards;
						staff.hazardsText = staffs[i].hazardsText;
						staff.induction = staffs[i].induction;
						staff.evacuation = staffs[i].evacuation;

						try
						{
							staff.documents = JSON.parse(staffs[i].documents);
						}
						catch (e)
						{
							staff.documents = {};
						}

						returnValue.push(staff);
					}
					return res.json({ success : true, staffs : returnValue });
				}
			});
		}
    }
}