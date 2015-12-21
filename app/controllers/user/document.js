var utils = require('../../../utils');

module.exports = function (opts) {
    var documentModel = opts.models.Document;
        
    return {
        "post#document/create" : function (req, res) {
            var site = req.body.site,
				documentText = req.body.document,
				required = req.body.required,
				site = req.body.site,
				_id = req.body._id;
                            
			var query = documentModel.findOne({_id : _id});
            query.exec(function (err, document) {
                if (err) {
                    console.log(err);
                    return res.json({ success : false, error : "Internal server error" });
                } else if (document) {
					document.updatedAt = new Date().getTime();
                } else {
					document = new documentModel();
					document.createdAt = new Date().getTime();
				}

				document.previous = _id;
				document.site = site;
				document.required = required;
				if(!document.document){
					document.document = [];
				}
				document.document.push(documentText);
				
				document.save(function (err, document) {
					if (err) {
						console.log(err);
						return res.json({ success : false, error : "Internal server error" });
					} else {
						return res.json({ success : true });
					}
				});
            });
        },

		"post#document/get" : function( req, res) {
			var site = req.body.site;
			documentModel.find({site : site}, function(err, documents){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					return res.json({ success : true, documents : documents });
				}
			});
		},
			
		"post#document/delete" : function( req, res) {
			var id = req.body.id;
			console.log(id);
			documentModel.remove({ _id : id}, function(err){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					return res.json({ success : true });
				}
			});
		},
    }
}