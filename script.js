const todoList = [
  { idTask: 1, title: "Попить кофе", date: "2019-05-03" },
  { idTask: 2, title: "Погладить кота", date: "2019-05-30" },
  { idTask: 3, title: "Накормить кота", date: "2019-05-01" },
  { idTask: 4, title: "Уложить спать кота", date: "2019-05-09" }
];

const listItem = document.getElementById("todoListItem"); // div для вывод
const buttonAddTask = document.getElementById("buttonAddTask");
const textInput = document.getElementById("inputTextTask");
const dateInput = document.getElementById("inputDateTask");

buttonAddTask.addEventListener("click", addTask);
document.querySelector(".listItem").addEventListener("click", updatCheck, true);

function addTask() {
  let idTask = ID();
  let title = textInput.value;
  let date = dateInput.value;
  if (title == "" || date == "") {
    alert("ERROR! Все полня должны быть заполнены");
  } else {
    todoList.push({
      idTask,
      title,
      date
    });
    drawingItem(title, date, idTask);
    clearInput();
  }
}
var ID = function() {
  return Math.random()
    .toExponential(36)
    .substr(2, 9);
};
function clearInput() {
  textInput.value = "";
  dateInput.value = "";
}

function drawingItem(title, date, key) {
  const check = document.createElement("input");
  const divText = document.createElement("div");
  const divDate = document.createElement("div");
  const todoItem = document.createElement("div");
  const deleteButton = document.createElement("button");

  deleteButton.innerHTML = "&#10006";

  check.type = "checkbox";

  check.classList.add("single-todo__check");
  divText.classList.add("single-todo__text");
  divDate.classList.add("single-todo__date");
  todoItem.classList.add("single-todo__item");
  deleteButton.classList.add("delete-todo__item");

  divText.innerHTML = title;
  divDate.innerHTML = date;

  todoItem.appendChild(check);
  todoItem.setAttribute("key", key);

  todoItem.appendChild(divText);
  todoItem.appendChild(divDate);
  todoItem.appendChild(deleteButton);
  listItem.appendChild(todoItem);
}

function updatCheck(event) {
  const target = event.target;
  if (target.type == "checkbox") {
    if (target.checked) {
      target.parentNode.classList.add("todo-item__checked");
    } else {
      target.parentNode.classList.remove("todo-item__checked");
    }
  }
  let key = target.parentNode.getAttribute("key");

  if (target.type == "submit") {
    deleteTasks(event.target.parentNode, key);
  }
}
function deleteTasks(node, key) {
  node.remove();
  todoList.splice(todoList.findIndex(item => item.idTask === key), 1);
}

window.onload = function() {
  for (let key = 0; key < todoList.length; key++) {
    drawingItem(todoList[key].title, todoList[key].date, todoList[key].idTask);
  }
};
