'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// the todo Revealing Module Pattern
var todo = function () {

  // cache DOM
  var container = document.getElementById('todo');
  var todoList = container.querySelector('[data-todo="list"]');
  var addTodoInput = container.querySelector('[data-todo="add-item"]');

  var todos = [];

  // Bind Event(s) (really it's just one event delegation)
  container.addEventListener('click', function (event) {
    // get the index using ES6 destructuring, then back to an array, then indexOf
    var index = [].concat(_toConsumableArray(todoList.children)).indexOf(event.target.closest('[data-todo="item"]') || event.target.closest('[data-todo="item-edit"]'));
    var action = event.target.getAttribute('data-todo');
    if (action === 'edit') editTodo(index);else if (action === 'delete') deleteTodo(index);else if (action === 'add') addTodo();else if (action === 'cancel') cancelTodo(index);else if (action === 'update') updateTodo(index);else if (action === 'checkmark') completeTodo(index);
  });

  container.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      var action = event.target.getAttribute('data-todo');
      if (action === 'add-item') addTodo();else {
        var index = [].concat(_toConsumableArray(todoList.children)).indexOf(event.target.closest('[data-todo="item"]') || event.target.closest('[data-todo="item-edit"]'));
        if (action === 'edit-item') updateTodo(index);
      }
    }
  });

  container.addEventListener('keyup', function (event) {
    if (event.keyCode === 27) {
      var action = event.target.getAttribute('data-todo');
      var index = [].concat(_toConsumableArray(todoList.children)).indexOf(event.target.closest('[data-todo="item"]') || event.target.closest('[data-todo="item-edit"]'));
      if (action === 'edit-item') cancelTodo(index);
    }
  });

  getTodos(_render);

  // _render is the only place we repaint:
  function _render(selectedIndex) {
    todoList.innerHTML = '';
    todos.forEach(function (item) {
      if (item.status !== 'edit') {
        // this one displays the todo item:
        todoList.innerHTML += '<li class="list-group-item' + (item.status === 'complete' ? ' is-complete' : '') + '" data-todo="item">\n            <label class="form-check-label" data-todo="checkmark">\n              <input class="form-check-input" type="checkbox" ' + (item.status === 'complete' ? 'checked' : '') + ' value="" data-todo="checkmark">' + item.title + '\n            </label>\n            ' + (item.status === 'complete' ? '<button class="btn btn-sm btn-danger" data-todo="delete">Delete</button>' : '<button class="btn btn-sm btn-default" data-todo="edit">edit</button>') + '\n          </li>';
      } else {
        // This one edits:
        todoList.innerHTML += '<li class="list-group-item edit" data-todo="item-edit">\n          <input class="form-control" data-todo="edit-item" type="text" value="' + item.title + '">\n          <button class="btn btn-sm btn-default" data-todo="cancel">Cancel</button>\n          <button class="btn btn-sm btn-success" data-todo="update">Update</button>\n          <button class="btn btn-sm btn-danger" data-todo="delete">Delete</button>\n        </li>';
      }
    });
    if (selectedIndex !== undefined) {
      todoList.children[selectedIndex].querySelector('[data-todo="edit-item"]').select();
    }
  }

  // RESTful events
  function getTodos(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/api/todos', true);
    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        // todos = Object.keys(data).map((k) => data[k])
        todos = JSON.parse(this.response);
        callback();
      }
    };
    request.send();
  }
  function postTodos() {}
  function putTodos() {}
  function deleteTodos() {}

  function addTodo(input) {
    // check if there's an input:
    input = input || addTodoInput.value;
    // if either one is an input:
    if (input) {
      // add it to the top:
      todos.unshift({
        title: input,
        status: 'open'
      });
      // clear out the input
      addTodoInput.value = '';
      _render();
    } else {
      alert('Please enter a todo item.');
    }
  }

  function completeTodo(index) {
    todos[index].status = todos[index].status === 'open' ? 'complete' : 'open';
    _render();
  }

  function editTodo(index) {
    todos[index].status = 'edit';
    _render(index);
  }

  function cancelTodo(index) {
    todos[index].status = 'open';
    _render();
  }

  function updateTodo(index) {
    todos[index].title = todoList.children[index].querySelector('[data-todo="edit-item"]').value;
    todos[index].status = 'open';
    _render();
  }

  function deleteTodo(index) {
    // take 1 object out of the array at the index:
    todos.splice(index, 1);
    _render();
  }

  // return the public methods
  return {
    addTodo: addTodo,
    completeTodo: completeTodo,
    editTodo: editTodo,
    cancelTodo: cancelTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo
  };
}();

if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
if (!Element.prototype.closest) Element.prototype.closest = function (selector) {
  var el = this;
  while (el) {
    if (el.matches(selector)) return el;
    el = el.parentElement;
  }
};
//# sourceMappingURL=todo.js.map
