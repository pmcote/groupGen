// Importing. . .
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

// Import Routes
var index = require('./routes/index');

// Express
var app = express();
var port = process.env.PORT || 3000;

// Set up mongoose connection to mongo database
mongoose.connect('mongodb://localhost/students');

// Setting up basic logging functionality, path, handlebars
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', index.home);

app.post('/createClass', index.createClass);
app.post('/addStudent', index.addStudent);

// Listening on. . .
app.listen(port);
