var mongoose = require('mongoose');

var TodoList = new mongoose.Schema({
  todos: Array
});

module.exports = mongoose.model('TodoList', TodoList);