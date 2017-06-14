
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var todoSchema = new mongoose.Schema({
  title: String,
  status: String,
});

// Return model
module.exports = restful.model('ToDos', todoSchema);