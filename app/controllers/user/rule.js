var utils = require('../../../utils');

module.exports = function (opts) {
    var ruleModel = opts.models.Rule;
        
    return {
        "post#rule/create" : function (req, res) {
            var site = req.body.site,
				previous = req.body.previous,
				next = req.body.next;
                            
			var query = ruleModel.findOne({site : site, previous : previous, next : next});
            query.exec(function (err, rule) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false, error : "Internal server error" });
                } else if (rule) {
					return res.json({ success : false, error : "Same rule already exists." });
                }
				
				rule = new ruleModel();

				rule.site = site;
				rule.previous = previous;
				rule.next = next;
				
				rule.save(function (err, rule) {
					if (err) {
						console.log(err);
						return res.json({ success : false, error : "Internal server error" });
					} else {
						return res.json({ success : true });
					}
				});
            });
        },

		"post#rule/get" : function( req, res) {
			var site = req.body.site;
			ruleModel.find({site : site}, function(err, rules){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					return res.json({ success : true, rules : rules });
				}
			});
		},

		"post#rule/delete" : function( req, res) {
			var id = req.body.id;
			console.log(id);
			ruleModel.remove({ _id : id}, function(err){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					return res.json({ success : true });
				}
			});
		},
    }
}