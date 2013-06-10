var app = require('../app');

exports.by_favoritor = function(req, res) {
	app.sendQuery('SELECT f.doc_id, f.created_at FROM favorites f INNER JOIN users u ON u.id=f.user_id WHERE u.login = ?', [req.params.username], function(results) {
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

exports.all_recent = function(req, res) {
	app.sendQuery('SELECT f.doc_id, f.created_at FROM favorites f limit ?', [100], function(results) {
    res.send(results);
  });
};


