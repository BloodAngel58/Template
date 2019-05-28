const todoList = [
  { title: "Попить кофе", date: "2019-05-03" },
  { title: "Погладить кота", date: "2019-05-30" },
  { title: "Накормить кота", date: "2019-05-01" },
  { title: "Уложить спать кота", date: "2019-05-09" }
];
let listItem = document.getElementById("ListItem"); // div для вывод
let buttonAdd = document.getElementById("add");

function onclick() {
  let title = document.getElementById("text").value;
  let date = document.getElementById("date").value;

  todoList.push({
    title,
    date
  });
  drawing(title, date);
  Clear();
}

function Clear() {
  document.getElementById("text").value = "";
  document.getElementById("date").value = "";
}

function OutTask() {
  for (let key = 0; key < todoList.length; key++) {
    drawing(todoList[key].title, todoList[key].date);
  }
}

function drawing(title, date) {
  let divText = document.createElement("div");
  divText.className = "single-todo__text";
  let divDate = document.createElement("div");
  divDate.className = "single-todo__date";
  let todoItem = document.createElement("div");
  todoItem.className = "single-todo";
  divText.innerHTML = title;
  divDate.innerHTML = date;
  listItem.appendChild(todoItem);
  todoItem.appendChild(divText);
  todoItem.appendChild(divDate);
}

buttonAdd.addEventListener("click", onclick);

window.onload = function() {
  OutTask();
};
