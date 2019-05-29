const todoList = [
  { title: "Попить кофе", date: "2019-05-03" },
  { title: "Погладить кота", date: "2019-05-30" },
  { title: "Накормить кота", date: "2019-05-01" },
  { title: "Уложить спать кота", date: "2019-05-09" }
];

let listItem = document.getElementById("todoListItem"); // div для вывод
let buttonAddTask = document.getElementById("buttonAddTask");

buttonAddTask.addEventListener("click", onclick);
document.querySelector(".listItem").addEventListener("click", updatCheck, true);

function onclick() {
  let title = document.getElementById("inputTextTask").value;

  let date = document.getElementById("inputDateTask").value;

  todoList.push({
    title,
    date
  });

  drawing(title, date, todoList.length - 1);
  clearInput();
}

function clearInput() {
  document.getElementById("inputTextTask").value = "";
  document.getElementById("inputDateTask").value = "";
}

function drawing(title, date, key) {
  let check = document.createElement("input");
  let divText = document.createElement("div");
  let divDate = document.createElement("div");
  let todoItem = document.createElement("div");
  let deleteButton = document.createElement("button");

  deleteButton.innerHTML = "&#10006";

  check.type = "checkbox";

  check.classList.add("single-todo__check");
  divText.classList.add("single-todo__text");
  divDate.classList.add("single-todo__date");
  todoItem.classList.add("single-todo__item");
  deleteButton.classList.add("delete-todo__item");

  divText.innerHTML = title;
  divDate.innerHTML = date;

  listItem.appendChild(todoItem);

  todoItem.appendChild(check);
  todoItem.setAttribute("key", key);

  todoItem.appendChild(divText);

  todoItem.appendChild(divDate);

  todoItem.appendChild(deleteButton);
}

function updatCheck(event) {
  let target = event.target;
  if (target.type == "checkbox") {
    if (target.checked) {
      target.parentNode.classList.toggle("todo-item__checked");
    } else {
      target.parentNode.classList.toggle("todo-item__checked");
    }
  }
  let key = target.parentNode.getAttribute("key");

  if (target.type == "submit") {
    deleteTasks(event, key);
  }
}
function deleteTasks(event, key) {
  let target = event.target;
  event.target.parentNode.remove();
  delete todoList[key];
}

window.onload = function() {
  for (let key = 0; key < todoList.length; key++) {
    drawing(todoList[key].title, todoList[key].date, key);
  }
};
