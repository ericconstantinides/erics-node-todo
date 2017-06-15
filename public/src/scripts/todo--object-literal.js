// the todo object literal
let todo = {
  // init runs first:
  todos: [
    {
      title: "clean my room",
      status: "complete"
    },
    {
      title: "take out the trash",
      status: "open"
    },
    {
      title: "mow the lawn",
      status: "open"
    }
  ],
  init: function() {
    this.cacheDom();
    this.bindEvents();
    this.render();
  },
  // cacheDom caches all of the available pieces into memory
  cacheDom: function() {
    this.container = document.getElementById('todo');
    this.todoList = this.container.getElementsByClassName('todo-list')[0];
    this.input = this.container.getElementsByClassName('add-todo__input')[0];
  },
  // bind actions
  bindEvents: function() {
    this.container.addEventListener('click', (event) => {
      // get the index using ES6 destructuring, then back to an array, then indexOf
      let index = [...this.todoList.children].indexOf(event.target.parentElement);
      let classes = event.target.classList;
      if (classes.contains('edit')) this.edit(index);
      else if (classes.contains('delete')) this.delete(index);
      else if (classes.contains('add')) this.add();
      else if (classes.contains('cancel')) this.cancel(index);
      else if (classes.contains('update')) this.update(index);
      else if (classes.contains('complete')) this.complete(index);
    });
  },
  // render is the only place we repaint:
  render: function() {
    this.todoList.innerHTML = '';
    this.todos.map( (item) => {
      if (item.status !== 'edit') {
        this.todoList.innerHTML +=
          `<li class="todo-item${item.status === 'complete' ? ' is-complete' : ''}">
            <span class="todo-item__checkbox complete"></span>
            <span class="todo-item__title title">${item.title}</span>
            <span class="todo-item__edit edit">edit</span>
            <span class="todo-item__delete delete">delete</span>
          </li>`;
        }
      else {
        this.todoList.innerHTML += `<li class="todo-item add-todo__input-container">
          <input class="add-todo__input title" type="text" value="${item.title}"><input class="add-todo__submit cancel" type="submit" value="cancel"><input class="add-todo__submit update" type="submit" value="update"><input class="add-todo__submit delete" type="submit" value="delete">
        </li>`;
      }
    });
  },
  add: function(input) {
    // check if there's an input:
    input = input || this.input.value;
    // if either one is an input:
    if(input) {
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
  complete: function(index) {
    this.todos[index].status = this.todos[index].status === 'open' ? 'complete' : 'open';
    this.render();
  },
  edit: function(index) {
    this.todos[index].status = 'edit';
    this.render();
  },
  cancel: function(index) {
    this.todos[index].status = 'open';
    this.render();
  },
  update: function(index) {
    this.todos[index].title = this.todoList.children[index].getElementsByClassName('title')[0].value;
    this.todos[index].status = 'open';
    this.render();
  },
  delete: function(index) {
    this.todos.splice(index, 1);
    this.render();
  }
};
todo.init();
