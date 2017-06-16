// the todo Revealing Module Pattern
let todo = (function() {

  // cache DOM
  let container = document.getElementById('todo');
  let todoList = container.querySelector('[data-todo="list"]');
  let addTodoInput = container.querySelector('[data-todo="add-item"]');

  let todos = [];

  // Bind Event(s) (really it's just one event delegation)
  container.addEventListener('click', (event) => {
    // get the index using ES6 destructuring, then back to an array, then indexOf
    let index = [...todoList.children].indexOf(event.target.closest('[data-todo="item"]')
      || event.target.closest('[data-todo="item-edit"]'));
    // get the database ID:
    let id = index > 0 ? todos[index]._id : null;
    let action = event.target.getAttribute('data-todo');
    if (action === 'edit') editTodo(index);
    else if (action === 'delete') deleteTodo(index,id);
    else if (action === 'add') addTodo();
    else if (action === 'cancel') cancelTodo(index);
    else if (action === 'update') updateTodo(index,id);
    else if (action === 'checkmark') completeTodo(index,id);
  });

  container.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      let action = event.target.getAttribute('data-todo');
      if (action === 'add-item') addTodo();
      else {
        let index = [...todoList.children].indexOf(event.target.closest('[data-todo="item"]') || event.target.closest('[data-todo="item-edit"]'));
        if (action === 'edit-item') updateTodo(index);
      }
    }
  });

  container.addEventListener('keyup', (event) => {
    if (event.keyCode === 27) {
      let action = event.target.getAttribute('data-todo');
      let index = [...todoList.children].indexOf(event.target.closest('[data-todo="item"]') || event.target.closest('[data-todo="item-edit"]'));
      if (action === 'edit-item') cancelTodo(index);
    }
  });

  getTodos(_render);

  // _render is the only place we repaint:
  function _render(selectedIndex) {
    todoList.innerHTML = '';
    todos.forEach(item => {
      if (item.status !== 'edit') {
        // this one displays the todo item:
        todoList.innerHTML +=
          `<li class="list-group-item${item.status === 'complete' ? ' is-complete' : ''}" data-todo="item">
            <label class="form-check-label" data-todo="checkmark">
              <input class="form-check-input" type="checkbox" ${item.status === 'complete' ? 'checked' : ''} value="" data-todo="checkmark">${item.title}
            </label>
            ${item.status === 'complete' ? '<button class="btn btn-sm btn-danger" data-todo="delete">Delete</button>' : '<button class="btn btn-sm btn-default" data-todo="edit">edit</button>'}
          </li>`;
      } else { // This one edits:
        todoList.innerHTML += `<li class="list-group-item edit" data-todo="item-edit">
          <input class="form-control" data-todo="edit-item" type="text" value="${item.title}">
          <button class="btn btn-sm btn-default" data-todo="cancel">Cancel</button>
          <button class="btn btn-sm btn-success" data-todo="update">Update</button>
          <button class="btn btn-sm btn-danger" data-todo="delete">Delete</button>
        </li>`;
      }
    });
    if (selectedIndex !== undefined) {
      todoList.children[selectedIndex].querySelector('[data-todo="edit-item"]').select();
    }
  }

  // RESTful events
  function getTodos(callback) {
    let request = new XMLHttpRequest();
    request.open('GET', '/todos', true);
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        todos = JSON.parse(this.response);
        callback()
      }
    };
    request.send();
  }
  function postTodos(){}
  function putTodos(){}

  function addTodo(input) {
    // check if there's an input:
    input = input || addTodoInput.value;
    // if either one is an input:
    if(input) {
      // add it to the list:
      let newPosition = todos.length;
      todos.push({
        title: input,
        status: 'open'
      });
      // add it to the api
      let request = new XMLHttpRequest();
      let newTodo = {
        title: input,
        status: "open"
      };
      request.open('POST', '/todos', true);
      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // add the id to the last one:
          todos[newPosition]._id = JSON.parse(this.response)._id;
        }
      };
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(newTodo));
      // clear out the input
      addTodoInput.value = '';
      _render();
    } else {
      alert('Please enter a todo item.');
    }
  }

  function completeTodo(index,dbId) {
    todos[index].status = todos[index].status === 'open' ? 'complete' : 'open';
    // update the api
    let updatedTodo = {
      title: todos[index].title,
      status: todos[index].status
    };
    let request = new XMLHttpRequest();
    request.open('PUT', `/todos/${dbId}`, true);
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // add the id to the last one:
      }
    };
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(updatedTodo));
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

  function updateTodo(index,dbId) {
    todos[index].title = todoList.children[index].querySelector('[data-todo="edit-item"]').value;
    todos[index].status = 'open';
    // update the api
    let updatedTodo = {
      title: todos[index].title,
      status: todos[index].status
    };
    let request = new XMLHttpRequest();
    request.open('PUT', `/todos/${dbId}`, true);
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // add the id to the last one:
      }
    };
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(updatedTodo));
    _render();
  }

  function deleteTodo(index,dbId) {
    let request = new XMLHttpRequest();
    request.open('DELETE', `/todos/${dbId}`, true);
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
      }
    };
    request.send();
    // take 1 object out of the array at the index:
    todos.splice(index, 1);
    _render();
  }

  // return the public methods
  return {
    addTodo,
    completeTodo,
    editTodo,
    cancelTodo,
    updateTodo,
    deleteTodo
  }
})();


if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector;
if (!Element.prototype.closest) Element.prototype.closest = function (selector) {
  let el = this;
  while (el) {
    if (el.matches(selector)) return el;
    el = el.parentElement;
  }
};