/*
var express = require('express');
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
*/
var express = require('express');
//var http = require('http');
 
/* Add the following require() calls at the top*/
//var querystring = require('querystring');
var util = require('util');

/*We need the fs (file system module) to write to files*/

var fs = require('fs');
var sprintf = require('sprintf');


//Postgres connection
var pg = require('pg');


if(process.env.DATABASE_URL){//we are on heroku
    //var pg = require('pg').native
    connectionString = process.env.DATABASE_URL //|| 'postgres://localhost:5432/myDB'

    var client = new pg.Client(connectionString);
    client.connect();
    //query = client.query('SELECT * FROM mytable');
    //query.on('end', function() { client.end(); });
}
else{//we are on ec2

    //format of conString = "postgres://user:password@host:port/dbname";

    var PGPASS_FILE = '../.pgpass';
    var pgtokens = fs.readFileSync(PGPASS_FILE).toString().split(':');
    var host = pgtokens[0];
    var port = pgtokens[1];
    var dbname = pgtokens[2];
    var user = pgtokens[3];
    var password = pgtokens[4];

    var conString = "postgres://" + user + ":" + password  + "@" + host + ":" + port + "/" + dbname;

    var client = new pg.Client(conString);
    client.connect();

}


client.query("CREATE TABLE IF NOT EXISTS formtest(Name varchar(255),Age varchar(255));");
//client.query("INSERT INTO formtest(Name, Age) values('Marty', '20')");

/*
var myquery = client.query("SELECT * FROM phonebook");
//fired after last row is emitted




myquery.on('row', function(row) {
  console.log(row);
});

myquery.on('end', function() { 
  client.end();
});
*/




//console.log("Hello");




var app = express(express.logger());


//app.configure(function(){
    app.use(express.bodyParser());
//});

app.use(express.static(process.env.PWD + '/'));


//http.createServer(function (req, res) {
  //  switch(req.url) {


app.get('/', function(req, res) {

    console.log("[200] " + req.method + " to " + req.url);
    
    var buffer = new Buffer(fs.readFileSync("form.html"));
    var formStr = buffer.toString("utf-8", 0, buffer.length);
    res.send(formStr);
});
//break;

//app.use(require('connect').bodyParser());
//app.use(express.bodyParser());
app.post('/formhandler', function(req, res) {
    console.log(req.body.name);
    //case '/formhandler':

    var sqlQuery = util.format("INSERT INTO formtest(Name, Age) values('%s', '%s')", req.body.name, req.body.age);
    console.log(sqlQuery);
    client.query(sqlQuery);
});
    
 /*
   if (req.method == 'POST') {
       console.log("[200] " + req.method + " to " + req.url);
           var fullBody = '';
	       
	       //console.log(req.body);
    
	           req.on('data', function(chunk) {
		   // append the current chunk of data to the fullBody variable
		   fullBody += chunk.toString();
		   console.log(fullBody);
		   if (fullBody.length > 1e6) { 
                    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                    request.connection.destroy();
		    }
		        });
			    
			    req.on('end', function() {
			    
			    // request ended -> do something with the data
			    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
			    
			    // parse the received body data
			    var decodedBody = querystring.parse(fullBody);
			    console.log("fullBody: " + fullBody);
			    //console.log("decodedBody: " + decodedBody);
			    //console.log(req.params);

			    //store the data in postgres
			    //client.query("INSERT INTO formtest(Name, Age) values('Yo Dawg', 'Biscuit')");
			    var sqlQuery = sprintf("INSERT INTO formtest(Name, Age) values(%s, %s)", res.body.name, res.body.age);
			    console.log(sqlQuery);
			    client.query(sqlQuery);
 
			    // writing of the decoded data to a file
			    console.log(decodedBody);
			    var file = fs.createWriteStream('file.txt', {'flags': 'a'});
			    
			    file.write("\n" + utils.inspect(decodedBody));
			    //console.log(JSON.parse("{&quot;testVal&quot;:&quot;test&quot;}"));
			    
			    // output the decoded data to the HTTP response          
			    res.write('<html><head><title>Post data</title></head><body><pre>');
			    res.write(utils.inspect(decodedBody));
			    res.write('</pre></body></html>');
			    
			    res.end();
			        });
    
				} else {
				    console.log("[405] " + req.method + " to " + req.url);
				        res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
					    res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
					    }*/
 // });
//break;
/*    default:
      res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
      res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
      console.log("[404] " + req.method + " to " + req.url);
    };
}).listen(8080); // listen on tcp port 8080 (all interfaces)
*/

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});
