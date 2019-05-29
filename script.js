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

  drawing(title, date);
  clearInput();
}

function clearInput() {
  document.getElementById("inputTextTask").value = "";
  document.getElementById("inputDateTask").value = "";
}

function drawing(title, date) {
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
  console.log(target.type);
  if (target.type == "submit") {
    deleteTasks(event);
  }
}
function deleteTasks(event) {
  let target = event.target;
  console.log("hello_22222");
  event.target.parentNode.remove();
}

window.onload = function() {
  for (let key = 0; key < todoList.length; key++) {
    drawing(todoList[key].title, todoList[key].date);
  }
};
/*
const removeItem = item => {
  item.parentNode.parentNode.removeChild(item.parentNode);
};
*/
