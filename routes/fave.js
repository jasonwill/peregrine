
exports.list = function(req, res) {
    sendQuery();
		res.send([{name:'fav1'}, {name:'fav2'}, {name:'fav3'}]);
};
 
exports.fetch = function(req, res) {
	  res.send({id:req.params.id, name: "The Name", description: "description"});
};
