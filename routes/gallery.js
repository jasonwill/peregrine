var app = require('../app');

exports.all_recent = function(req, res) {
	
	var q = "SELECT fl.doc_id, fl.created_at FROM file_linkings fl INNER JOIN docs d ON d.id = fl.doc_id INNER JOIN galleries g ON g.id = fl.fileable_id WHERE (fl.fileable_type = 'Gallery' AND g.collection_type != 'assignments' AND g.galleriable_type = 'User') GROUP BY fl.doc_id ORDER BY fl.created_at DESC LIMIT ?";  
	
	app.sendQuery(q, [50], function(results) {
    res.send(results);
  });
};


