var app = require('../app');

/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send('everyone');
};

exports.find_by_username = function(req, res){
	
	app.sendQuery(req, function(results) {
    res.send(results)
  });
	
	//res.send({id:req.params.id, name: "Bob"});
};