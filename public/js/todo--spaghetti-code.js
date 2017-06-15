
"use strict";

!function () {
  var todoContainer = document.getElementById('todo');
  var todoList = todoContainer.getElementsByClassName('todo-list')[0];
  var todos = [];

  function ToDo(title, complete) {
    this.title = title;
    this.complete = complete;
  }

  function getIndex(listItem) {
    for (var i = 0; i < todoList.children.length; i++) {
      if (listItem == todoList.children[i]) break;
    }
    return i;
  }

  // var ToDo.prototype.toggle = function() {
  //   this.complete = this.complete === false ? true : false;
  // };

  // function _init() {
  //   // create the initial object when coming in
  //   var todoEls = todoContainer.getElementsByClassName('todo-item');
  //   if (todoEls.length) {
  //     for (var i = 0; i < todoEls.length; i++) {
  //       var title = todoEls[i].getElementsByClassName('title')[0].innerText;
  //       var complete = todoEls[i].classList.contains('is-complete') ? true : false;
  //       var todoItem = new ToDo(title, complete);
  //       todos.push(todoItem);
  //     }
  //   }
  // }

  function add(index) {
    if (todoContainer.getElementsByClassName('add-todo__input')[0].value != '') {
      var todoItem = document.createElement('li');
      todoItem.classList.add('todo-item');
      var itemCheckbox = document.createElement('span');
      itemCheckbox.classList.add('todo-item__checkbox');
      itemCheckbox.classList.add('toggle');
      var itemTitle = document.createElement('span');
      itemTitle.classList.add('todo-item__title');
      itemTitle.classList.add('title');
      console.dir(todoContainer.getElementsByClassName('add-todo__input')[0]);
      itemTitle.innerText = todoContainer.getElementsByClassName('add-todo__input')[0].value;
      todoContainer.getElementsByClassName('add-todo__input')[0].value = '';
      var editItem = document.createElement('span');
      editItem.classList.add('todo-item__edit');
      editItem.classList.add('edit');
      editItem.innerText = 'edit';
      var deleteItem = document.createElement('span');
      deleteItem.classList.add('todo-item__delete');
      deleteItem.classList.add('delete');
      deleteItem.innerText = 'delete';

      if (typeof index === 'undefined') {
        todoItem.appendChild(itemCheckbox);
        todoItem.appendChild(itemTitle);
        todoItem.appendChild(editItem);
        todoItem.appendChild(deleteItem);

        todoList.insertBefore(todoItem, todoList.firstChild);
        todoList.appendChild(todoItem, todoList.firstChild);
      } else {
        // clearout
        while (todoList.children[index].firstChild) {
          todoList.children[index].removeChild(todoList.children[index].firstChild);
        }
        todoList.children[index].classList.remove('add-todo__input-container');
        todoList.children[index].appendChild(itemCheckbox);
        todoList.children[index].appendChild(itemTitle);
        todoList.children[index].appendChild(editItem);
        todoList.children[index].appendChild(deleteItem);
      }
    } else {
      alert('Nothing to add!');
    }
  }

  function edit(index) {
    // console.dir(todoList.children[index]);
    // debugger;
    todoList.children[index].classList.remove('is-complete');
    todoList.children[index].classList.add('add-todo__input-container');
    var inputText = document.createElement('input');
    inputText.classList.add('add-todo__input');
    inputText.setAttribute('type', 'text');
    inputText.value = todoList.children[index].getElementsByClassName('title')[0].innerText;
    var inputSubmit = document.createElement('input');
    inputSubmit.classList.add('add-todo__submit');
    inputSubmit.classList.add('update');
    inputSubmit.setAttribute('type', 'submit');
    inputSubmit.setAttribute('value', 'update');

    // clear out
    while (todoList.children[index].firstChild) {
      todoList.children[index].removeChild(todoList.children[index].firstChild);
    }

    todoList.children[index].appendChild(inputText);
    todoList.children[index].appendChild(inputSubmit);

    // todoList.children[index].appendChild(updateItem);

  }

  function createBindings() {
    todoContainer.addEventListener('click', function (event) {
      var index = getIndex(event.target.parentElement);
      if (event.target.classList.contains('edit')) {
        edit(index);
      } else if (event.target.classList.contains('delete')) {
        todoList.removeChild(event.target.parentElement);
      } else if (event.target.classList.contains('add')) {
        add();
      } else if (event.target.classList.contains('update')) {
        add(index);
      } else if (event.target.classList.contains('toggle')) {
        event.target.parentElement.classList.toggle('is-complete');
      }
    });
  }

  // _init();
  createBindings();
}();
//# sourceMappingURL=todo--spaghetti-code.js.map
