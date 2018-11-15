var removeee = '<img src="icons/rem.png" height="22" width="22"/>';
var completeee = '<img src="icons/complete.png" height="22" width="22"/>';

var data = localStorage.getItem('todoList')
  ? JSON.parse(localStorage.getItem('todoList'))
  : {
      todo: [],
      completed: []
    };

renderTodo();

function buttonclick() {
  var value = document.getElementById('item').value;
  if (value) {
    addItem(value);
    document.getElementById('item').value = null;

    data.todo.push(value);
  }
}

document.getElementById('item').addEventListener('keydown', function(e) {
  var value = document.getElementById('item').value;
  if (e.code === 'Enter' && value) {
    addItem(value);
    document.getElementById('item').value = null;

    data.todo.push(value);
  }
});

function renderTodo() {
  if (!data.todo.length && !data.completed.length) return;

  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i];
    addItem(value, false);
  }
  for (var j = 0; j < data.completed.length; j++) {
    var value = data.completed[j];
    addItem(value, true);
  }
}

function dataObjectUpdated() {
  //localStorage can only store text
  localStorage.setItem('todoList', JSON.stringify(data));
}

function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  value = item.innerText;
  if (id == 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  console.log(this);
  console.log(this.parentNode);
  console.log(item);
  console.log(parent);
  dataObjectUpdated();
  parent.removeChild(item);
}

function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var target =
    id == 'todo'
      ? document.getElementById('completed')
      : document.getElementById('todo');
  value = item.innerText;
  if (id == 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
  }
  console.log(data);
  dataObjectUpdated();
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

function addItem(text, completed) {
  var list = completed
    ? document.getElementById('completed')
    : document.getElementById('todo');
  var item = document.createElement('li');
  item.innerText = text;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeee;
  remove.addEventListener('click', removeItem);

  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeee;
  complete.addEventListener('click', completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);
  dataObjectUpdated();
  list.insertBefore(item, list.childNodes[0]);
}
