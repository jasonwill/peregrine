
/**
 * Module dependencies.
 */

var express = require('express')

  , routes = require('./routes')
  , user = require('./routes/user')
  , fave = require('./routes/fave')
  , gallery = require('./routes/gallery')

  , http = require('http')
  , path = require('path')

  , mysql = require('mysql')
  , redis = require('redis');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('aisdu8902713usalas213'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/** set default db info */
app.set('db_host', 'localhost');
app.set('db_user', 'root');
app.set('db_pw', '');

app.set('db_schema', 'homeroom_'+app.get('env'));

//~ development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack     : true
  }));
}
	
var pool = mysql.createPool({
  host      : app.settings.db_host,
  user      : app.settings.db_user,
  password  : app.settings.db_pw,
  database  : app.settings.db_schema
});

exports.sendQuery = function(q, args, respond){

	try {
		pool.getConnection(function(err,connection) {
	  	connection.connect();

			connection.query(q, args, function(err, results, fields) {
			  if (err) throw err;
				//console.log(results);
				respond(results);
			});	
   	
    	connection.end();
	
		});
	} catch(e) {
		system.debug("Database connection failed! : " + e);
	}
	
};


// Routes
app.get('/', routes.index);
app.get('/users/search/:username', user.find_by_username);

app.get('/faves', fave.all_recent);
app.get('/faves/for/:username', fave.by_favoritee);
app.get('/faves/by/:username', fave.by_favoritor);

app.get('/gallery', gallery.all_recent);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
