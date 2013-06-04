var app = require('../app');

exports.list = function(req, res) {
    app.sendQuery('bob',app.callbackFunction);
};
 
exports.fetch = function(req, res) {
	  res.send({id:req.params.id, name: "The Name", description: "description"});
};
