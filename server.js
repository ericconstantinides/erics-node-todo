// to run:
// start MongoDB with "mongod"
// start the server with "node server.js" or "nodemon server.js"

// Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// MongoDB
mongoose.connect('mongodb://localhost/rest_test');

// Express
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log(__dirname);

// Routes
app.use('/api', require('./routes/api'));

app.get('/', function (req, res) {
  res.render('default', {
    dummy: 'dummy'
  });
});

// Start Server
app.listen(3000);
console.log('API is running on port 3000');