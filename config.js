var mongoose = require("mongoose");

module.exports.devPort = process.env.PORT || 9010;
module.exports.prodPort = process.env.PORT || 80;

//module.exports.dbConnection = mongoose.createConnection("mongodb://heroku_tbgr3kv2:730kmucarmsspf813nblnumugq@ds053194.mongolab.com:53194/heroku_tbgr3kv2");
module.exports.dbConnection = mongoose.createConnection("mongodb://localhost:27017/local");