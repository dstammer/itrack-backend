module.exports = function (opts) {
    var userModel = opts.models.User;
        
    return {
        "post#user/create" : function (req, res) {
            var name = req.body.name,
				site = req.body.site,
				company = req.body.company,
				ownedCompany = req.body.ownedCompany,
				role = req.body.role,
				sitesafe = req.body.sitesafe,
				mobile = req.body.mobile,
				phone = req.body.phone,
				fax = req.body.fax,
				email = req.body.email,
				password = req.body.password;

/*
			if (!req.user.role || !(req.user.role != "1" || req.user.role != "2"))
			{
				return res.json({ success : false, error : "Insufficient permission" });
			}
  */                          
			var query = userModel.findOne({email: email});
            query.exec(function (err, user) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false, error : "Internal server error" });
                } else if (!user) {
					var user = new userModel();
                }

				user.name = name;
				user.site = (site)?site:[];
				if(company){
					if(company.constructor === Array){
						user.company = company;
					} else {
						user.company = [company];
					}
				} else {
					user.company = [];
				}

				if(ownedCompany){
					if(ownedCompany.constructor === Array){
						user.ownedCompany = ownedCompany;
					} else {
						user.ownedCompany = [ownedCompany];
					}
				} else {
					user.ownedCompany = [];
				}

				if(user.role && user.role == "3"){
					user.role = role;
				}
				user.sitesafe = sitesafe;
				user.mobile = mobile;
				user.phone = phone;
				user.fax = fax;
				user.email = email;
				user.password = password;
				if(role != "1"){
					user.preferences = JSON.stringify({
						"email": {"minor": req.body.email_minor, "moderate": req.body.email_moderate, "serious": req.body.email_serious, "new": req.body.email_new, "assigned": req.body.email_assigned},
						"alert": {"minor": req.body.alert_minor, "moderate": req.body.alert_moderate, "serious": req.body.alert_serious, "new": req.body.alert_new, "assigned": req.body.alert_assigned}
					});

					if(req.body.preferences){
						user.preferences = JSON.stringify(req.body.preferences);
					}
				} else {
					user.preferences = "";
				}

				console.log(user);

				user.save(function (err, user) {
					if (err) {
						console.log(err);
						return res.json({ success : false, error : "Internal server error" });
					} else {
						return res.json({ success : true });
					}
				});
            });
        },

		"post#user/get" : function( req, res) {
			userModel.find({$or : [{"role":"2"}, {"role":"3"}]}).exec(function( err, users ){
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