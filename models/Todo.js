var mongoose = require('mongoose');

var Todo = new mongoose.Schema({
  title: String,
  status: String
});

module.exports = mongoose.model('Todo', Todo);