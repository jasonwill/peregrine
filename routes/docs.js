var app = require('../app');

exports.index = function(req, res) {
	
	var q = "SELECT fl.doc_id, fl.created_at, d.title, u.name, u.login FROM file_linkings fl INNER JOIN docs d ON d.id = fl.doc_id INNER JOIN galleries g ON g.id = fl.fileable_id INNER JOIN users u ON u.id = fl.user_id WHERE (fl.fileable_type = 'Gallery' AND g.collection_type != 'assignments' AND g.galleriable_type = 'User') AND d.content_type like 'image%' AND fl.user_id IS NOT NULL GROUP BY d.id ORDER BY fl.created_at DESC LIMIT ?";  
	
	app.sendQuery(q, [80], function(results) {
    res.send(results);
  });
};


exports.by_favoritee = function(req, res) {
	app.sendQuery('SELECT f.doc_id, f.created_at, d.title FROM favorites f '
	                 + 'INNER JOIN docs d ON d.id=f.doc_id '
	                 + 'INNER JOIN file_linkings fl ON f.id=fl.doc_id '
                   + 'INNER JOIN users u ON u.id=fl.user_id '
	                 + 'WHERE fileable_type="Gallery" and u.login = ?', [req.params.username], function(results) {
    res.send(results);
  });
};
