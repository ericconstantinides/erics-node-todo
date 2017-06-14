
// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Todos = require('../models/todos');

// Routes
Todos.methods(['get', 'put', 'post', 'delete']);
Todos.register(router, '/todos');

// router.get('/products', function(req, res) {
//   res.send('api is working');
// });

// Return router
module.exports = router;