var express = require('express');
var app = express();

var mongo = require('./mongo.js');
mongo.connectToServer(function (err) {
    app.listen(3000, function () {
        console.log('App listening on 3000...');
    });
});

// Parse JSON and make sure that it's not empty
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.post('*', jsonParser, function (req, res, next) {
  if (!req.body) return res.sendStatus(400);
  next();
});
app.put('*', jsonParser, function (req, res, next) {
  if (!req.body) return res.sendStatus(400);
  next();
});

// Set views path, template engine and default layout
app.use(express.static(__dirname + '/frontend'));
app.set('views', __dirname + '/frontend');
app.set('view engine', 'html');

app.get('/', function (req, res) {
  res.render('index', {
    err:''
  });
});

// routes
require('./routes/user.js')(app, mongo);
require('./routes/users.js')(app, mongo);
require('./routes/store.js')(app, mongo);
require('./routes/stores.js')(app, mongo);
require('./routes/review.js')(app, mongo);
require('./routes/aggregate.js')(app, mongo);
