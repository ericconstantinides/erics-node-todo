var express = require('express');
var router = express.Router();

var Todo = require('../models/Todo.js');
var TodoList = require('../models/TodoList.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});
/*
// GET /todos listing.
router.get('/todoLists', function(req, res, next) {
  console.log(TodoList
  TodoList.find(function (err, todoList) {
    if (err) return next(err);
    res.json(todoLists);
  });
  // TodoList.find(({}), function (err, todoList) {
  //   if (err) return next(err);
  //   console.log(todoList);
  //   todoList.forEach( function(list, index) {
  //     let listArray = [];
  //     list.forEach( function(todoId, index) {
  //       Todo.findById(todoId, function (err, post) {
  //         if (err) return next(err);
  //         listArray.push(post);
  //       });
  //     });
  //     res.json(listArray);
  //   });
  // });
});
*/
/* POST /todos */
router.post('/', function(req, res, next) {
  Todo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;