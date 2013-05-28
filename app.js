
/**
 * Module dependencies.
 */

var express = require('express')

  , routes = require('./routes')
  , user = require('./routes/user')
  , fave = require('./routes/fave')

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

exports.sendQuery = function(q){

	try {
		pool.getConnection(function(err,connection) {
	  	connection.connect();

		  var limit = 100;

			connection.query('SELECT * from favorites limit ?', [limit], function(err, results, fields) {
			  if (err) throw err;
				console.log(results);
			});

			connection.end();
		});
	} catch(e) {
		system.debug("Database connection failed! : " + e);
	}

	
};

// Routes
app.get('/', routes.index);
app.get('/users', user.list);

app.get('/faves', fave.list);
app.get('/faves/:id', fave.fetch);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
