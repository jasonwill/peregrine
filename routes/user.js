var app = require('../app');

exports.find_by_username = function(req, res){	
	app.sendQuery('SELECT id, name, email, color FROM users WHERE login = ?', [req.params.username], function(results) {
    res.send(results);
    
	  //res.render('user', results);

  });
};