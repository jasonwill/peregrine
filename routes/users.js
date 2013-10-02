var app = require('../app');

exports.show = function(req, res){	
	app.sendQuery('SELECT id, login, name, email, color, avatar_url FROM users WHERE login = ?', [req.params.username], function(results) {
    res.send(results);
    
	  //res.render('user', results);

  });
};