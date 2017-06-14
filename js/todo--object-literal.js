"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// the todo object literal
var todo = {
  // init runs first:
  todos: [{
    title: "clean my room",
    status: "complete"
  }, {
    title: "take out the trash",
    status: "open"
  }, {
    title: "mow the lawn",
    status: "open"
  }],
  init: function init() {
    this.cacheDom();
    this.bindEvents();
    this.render();
  },
  // cacheDom caches all of the available pieces into memory
  cacheDom: function cacheDom() {
    this.container = document.getElementById('todo');
    this.todoList = this.container.getElementsByClassName('todo-list')[0];
    this.input = this.container.getElementsByClassName('add-todo__input')[0];
  },
  // bind actions
  bindEvents: function bindEvents() {
    var _this = this;

    this.container.addEventListener('click', function (event) {
      // get the index using ES6 destructuring, then back to an array, then indexOf
      var index = [].concat(_toConsumableArray(_this.todoList.children)).indexOf(event.target.parentElement);
      var classes = event.target.classList;
      if (classes.contains('edit')) _this.edit(index);else if (classes.contains('delete')) _this.delete(index);else if (classes.contains('add')) _this.add();else if (classes.contains('cancel')) _this.cancel(index);else if (classes.contains('update')) _this.update(index);else if (classes.contains('complete')) _this.complete(index);
    });
  },
  // render is the only place we repaint:
  render: function render() {
    var _this2 = this;

    this.todoList.innerHTML = '';
    this.todos.map(function (item) {
      if (item.status !== 'edit') {
        _this2.todoList.innerHTML += "<li class=\"todo-item" + (item.status === 'complete' ? ' is-complete' : '') + "\">\n            <span class=\"todo-item__checkbox complete\"></span>\n            <span class=\"todo-item__title title\">" + item.title + "</span>\n            <span class=\"todo-item__edit edit\">edit</span>\n            <span class=\"todo-item__delete delete\">delete</span>\n          </li>";
      } else {
        _this2.todoList.innerHTML += "<li class=\"todo-item add-todo__input-container\">\n          <input class=\"add-todo__input title\" type=\"text\" value=\"" + item.title + "\"><input class=\"add-todo__submit cancel\" type=\"submit\" value=\"cancel\"><input class=\"add-todo__submit update\" type=\"submit\" value=\"update\"><input class=\"add-todo__submit delete\" type=\"submit\" value=\"delete\">\n        </li>";
      }
    });
  },
  add: function add(input) {
    // check if there's an input:
    input = input || this.input.value;
    // if either one is an input:
    if (input) {
      // add it to the top:
      this.todos.unshift({
        title: input,
        status: 'open'
      });
      this.input.value = '';
      this.render();
    } else {
      alert('Please enter a todo item.');
    }
  },
  complete: function complete(index) {
    this.todos[index].status = this.todos[index].status === 'open' ? 'complete' : 'open';
    this.render();
  },
  edit: function edit(index) {
    this.todos[index].status = 'edit';
    this.render();
  },
  cancel: function cancel(index) {
    this.todos[index].status = 'open';
    this.render();
  },
  update: function update(index) {
    this.todos[index].title = this.todoList.children[index].getElementsByClassName('title')[0].value;
    this.todos[index].status = 'open';
    this.render();
  },
  delete: function _delete(index) {
    this.todos.splice(index, 1);
    this.render();
  }
};
todo.init();
//# sourceMappingURL=todo--object-literal.js.map
