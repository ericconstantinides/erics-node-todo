// to run:
// start MongoDB with "mongod"
// start the server with "node server--stripped-to-its-core.js" or "nodemon server--stripped-to-its-core.js"

// Dependencies
var express = require('express');
var app = express();

app.get('/', function (req, res) { res.send('Hello Wolld from server--stripped-to-its-core.js') });

// Start Server
app.listen(3001);

// output to the terminal:
console.log('Server is running on port 3001');