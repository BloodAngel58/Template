const todoList = [
  { NewTask: "Попить кофе", NewDate: "2019-05-03" },
  { NewTask: "Погладить кота", NewDate: "2019-05-30" },
  { NewTask: "Накормить кота", NewDate: "2019-05-01" },
  { NewTask: "Уложить спать кота", NewDate: "2019-05-09" }
];
let listItem = document.getElementById("ListItem"); // div для вывод
let buttonAdd = document.getElementById("add");

function onclick() {
  let NewTask = document.getElementById("text").value;
  let NewDate = document.getElementById("date").value;
  let temp = {};
  temp.NewTask = NewTask;
  temp.NewDate = NewDate;
  todoList.push(temp);

  let divText = document.createElement("div");
  divText.className = "single-todo__text";
  let divDate = document.createElement("div");
  divDate.className = "single-todo__date";
  let todoItem = document.createElement("div");
  todoItem.className = "single-todo";
  divText.innerHTML = temp.NewTask;
  divDate.innerHTML = temp.NewDate;

  listItem.appendChild(todoItem);
  todoItem.appendChild(divText);
  todoItem.appendChild(divDate);
}

function OutTask() {
  for (let key = 0; key < todoList.length; key++) {
    let divText = document.createElement("div");
    divText.className = "single-todo__text";
    let divDate = document.createElement("div");
    divDate.className = "single-todo__date";
    let todoItem = document.createElement("div");
    todoItem.className = "single-todo";
    divText.innerHTML = todoList[key].NewTask;
    divDate.innerHTML = todoList[key].NewDate;

    listItem.appendChild(todoItem);
    todoItem.appendChild(divText);
    todoItem.appendChild(divDate);
  }
}
buttonAdd.addEventListener("click", onclick);

window.onload = function() {
  OutTask();
};
