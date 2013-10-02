//~ Peregrine :: a speedy node-express REST API ~//

//~ reqs ~//
var express = require('express')

  , routes = require('./routes')
  , users = require('./routes/users')
  , faves = require('./routes/faves')
  , docs = require('./routes/docs')

  , http = require('http')
  , path = require('path')

  , mysql = require('mysql')
  , redis = require('redis');

var app = express();

//~ app config ~//
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

//~ development only ~//
if ('development' == app.get('env')) {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack     : true
  }));
}


//**********************************//
//*********** Database *************//
//**********************************//

//~ db config ~//
app.set('db_host', 'localhost');
app.set('db_user', 'root');
app.set('db_pw', '');

app.set('db_schema', 'homeroom_'+app.get('env'));

//~ setup db connection pool ~//
var pool = mysql.createPool({
  host      : app.settings.db_host,
  user      : app.settings.db_user,
  password  : app.settings.db_pw,
  database  : app.settings.db_schema
});

//~ setup db connection pool ~//
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


//**********************************//
//************ Routes **************//
//**********************************//

app.get('/', routes.index);
app.get('/users/:username', users.show);

app.get('/faves', faves.index);
app.get('/faves/:username', faves.show);

app.get('/faves/hof', faves.hall_of_famers);

app.get('/docs/:username/faves', docs.by_favoritee);

app.get('/docs', docs.index);



//!!! Start it up
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = exports.app = app ;
