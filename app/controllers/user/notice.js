var utils = require('../../../utils');

module.exports = function (opts) {
    var noticeModel = opts.models.Notice;
        
    return {
        "post#notice/create" : function (req, res) {
            var site = req.body.site,
				startDate = req.body.startDate,
				endDate = req.body.endDate,
				openTime = req.body.openTime,
				closeTime = req.body.closeTime,
				noticeText = req.body.notice;
                            
			var query = noticeModel.findOne({site : site});

			notice = new noticeModel();

			notice.site = site;
			notice.notice = noticeText;
			notice.startDate = startDate;
			notice.endDate = endDate;
			notice.openTime = openTime;
			notice.closeTime = closeTime;
			notice.createdAt = new Date().getTime();
			
			notice.save(function (err, notice) {
				if (err) {
					console.log(err);
					return res.json({ success : false, error : "Internal server error" });
				} else {
					return res.json({ success : true });
				}
			});
        },

		"post#notice/get" : function( req, res) {
			var site = req.body.site;
			noticeModel.find({site : site}, function(err, notices){
				if(err){
					return res.json({ success : false, error : "Internal server error" });
				} else {
					var notice;
					for(var i = 0; i < notices.length; i++){
						if(!notice) {
							notice = notices[i];
						} else if (notice.createdAt < notices[i].createdAt) {
							notice = notices[i];
						}
					}
					return res.json({ success : true, notice : notice });
				}
			});
		}
    }
}