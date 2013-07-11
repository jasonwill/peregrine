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
	app.sendQuery('SELECT f.doc_id, f.created_at, d.title, u.name AS user_fullname, u.login FROM favorites f INNER JOIN docs d ON d.id=f.doc_id INNER JOIN file_linkings fl ON d.id=fl.doc_id INNER JOIN users u ON u.id = fl.user_id GROUP BY f.doc_id ORDER BY f.created_at DESC LIMIT ?', [100], function(results) {
    res.send(results);
  });
};

exports.hall_of_famers = function(req, res) {
	app.sendQuery('SELECT d.id, d.title, u.name AS user_fullname, u.login, u.last_login, count(f.id) AS fav_cnt FROM file_linkings fl INNER JOIN docs d ON d.id=fl.doc_id INNER JOIN favorites f ON f.doc_id=d.id INNER JOIN users u on u.id=fl.user_id GROUP BY fl.doc_id HAVING fav_cnt > ? ORDER BY RAND() DESC LIMIT ?', [7,100], function(results) {
    res.send(results);
  });
};
