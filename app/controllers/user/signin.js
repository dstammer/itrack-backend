module.exports = function (opts) {
    var signInModel = opts.models.SignIn;
        
    return {
        "post#signin/create" : function (req, res) {
            var site = req.body.site,
				isDefault = req.body.isDefault,
				trade = req.body.trade,
				questionnaire = req.body.questionnaire,
				hazards = req.body.hazards,
				induction = req.body.induction,
				evacuation = req.body.evacuation,
				documents = req.body.documents,
				enabled = req.body.enabled;
               
			var query;

			if(isDefault || isDefault == "YES"){
				query = signInModel.findOne({isDefault : isDefault});
			} else {
				query = signInModel.findOne({site : site});
			}

            query.exec(function (err, signin) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false, error : "Internal server error" });
                } else if (!signin) {
					var signin = new signInModel();
                }

				if(site) signin.site = site;
				if(isDefault) signin.isDefault = isDefault;
				if(trade) signin.trade = JSON.stringify(trade);
				if(questionnaire) signin.questionnaire = JSON.stringify(questionnaire);
				if(hazards) signin.hazards = JSON.stringify(hazards);
				if(induction) signin.induction = JSON.stringify(induction);
				if(evacuation) signin.evacuation = JSON.stringify(evacuation);
				if(documents) signin.documents = JSON.stringify(documents);
				if(enabled) signin.enabled = enabled;

				signin.save(function (err, signin) {
					if (err) {
						console.log(err);
						return res.json({ success : false, error : "Internal server error" });
					} else {
						return res.json({ success : true });
					}
				});
            });
        },

		"post#signin/get" : function( req, res) {
			var site = req.body.site,
				isDefault = req.body.isDefault;

			var query;

			if(isDefault || isDefault == "YES"){
				query = signInModel.findOne({isDefault : isDefault});
			} else {
				query = signInModel.findOne({site : site});
			}
			signInModel.find({}).exec(function( err, users ){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					console.log(users);
					var returnValue = [];
					for(var i = 0; i < users.length; i++){
						var user = {};
						
						user._id = users[i]._id
						user.name = users[i].name;
						user.site = users[i].site;
						user.company = users[i].company;
						user.ownedCompany = users[i].ownedCompany;
						user.role = users[i].role;
						user.roles = users[i].roles;
						user.sitesafe = users[i].sitesafe;
						user.mobile = users[i].mobile;
						user.phone = users[i].phone;
						user.fax = users[i].fax;
						user.email = users[i].email;
						user.password = users[i].password;

						try
						{
							user.preferences = JSON.parse(users[i].preferences);
						}
						catch (e)
						{
							user.preferences = {};
						}

						returnValue.push(user);
					}
					return res.json({ success : true, users : returnValue });
				}
			});
		},

		"post#user/delete" : function( req, res) {
			var id = req.body.id;
			userModel.remove({ _id : id}, function(err){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					return res.json({ success : true });
				}
			});
		},
    }
}