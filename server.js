var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path')
var pg = require("pg");
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var config = { database: "upsilon" };

var pool = new pg.Pool(config);
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.get('/', function (req,res) {
//   res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
// });
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

// app.get('/*', function (req, res) {
// res.sendFile(path.join(__dirname, 'public/views/pages/home.html'));
// });

app.post("/favs", function(req, res) {
  console.log(req.body.comment)
  // err - an error object, will be non-null if there was some error
  //       connecting to the DB. ex. DB not running, config is incorrect
  // client - used to make actual queries against DB
  // done - function to call when we are finished
  //        returns the connection back to the pool
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {console.log('everything is working');
      // no error occurred, time to query
      // 1. sql string - the actual SQL query we want to running
      // 2. array of data - any data we want to pass to a parameterized statement
      // 3. callback - function to run after the database gives us our result
      //               takes an error object and the result object as it's args
      client.query(
        "INSERT INTO favs (comment,url) VALUES ($1,$2) RETURNING *;",
        [ req.body.comment,req.body.url],
        function(err, result) {
          done();
          if (err) {
            console.log("Error querying DB", err);
            res.sendStatus(500);
          } else {
            console.log("Got info from DB", result.rows);
            res.send(result.rows);
          }
        }
      );
    }
  });
});

app.get("/favs", function(req, res) {
  // console.log(req.body.comment)
  // err - an error object, will be non-null if there was some error
  //       connecting to the DB. ex. DB not running, config is incorrect
  // client - used to make actual queries against DB
  // done - function to call when we are finished
  //        returns the connection back to the pool
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {console.log('everything is working');
      // no error occurred, time to query
      // 1. sql string - the actual SQL query we want to running
      // 2. array of data - any data we want to pass to a parameterized statement
      // 3. callback - function to run after the database gives us our result
      //               takes an error object and the result object as it's args
      client.query(
        "SELECT * FROM favs;",
        function(err, result) {
          done();
          if (err) {
            console.log("Error querying DB", err);
            res.sendStatus(500);
          } else {
            console.log("Got info from DB", result.rows);
            res.send(result.rows);
          }
        }
      );
    }
  });
});

app.get("/favscount", function(req, res) {
  // console.log(req.body.comment)
  // err - an error object, will be non-null if there was some error
  //       connecting to the DB. ex. DB not running, config is incorrect
  // client - used to make actual queries against DB
  // done - function to call when we are finished
  //        returns the connection back to the pool
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Error connecting to DB", err);
      res.sendStatus(500);
      done();
    } else {console.log('everything is working');
      // no error occurred, time to query
      // 1. sql string - the actual SQL query we want to running
      // 2. array of data - any data we want to pass to a parameterized statement
      // 3. callback - function to run after the database gives us our result
      //               takes an error object and the result object as it's args
      client.query(
        "SELECT COUNT(*) FROM favs;",
        function(err, result) {
          done();
          if (err) {
            console.log("Error querying DB", err);
            res.sendStatus(500);
          } else {
            console.log("Got info from DB", result);
            res.send(result);
          }
        }
      );
    }
  });
});








var server = app.listen(port, function() {
  console.log('Server listening on port', server.address().port);
});
