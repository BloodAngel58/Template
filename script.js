const todoList = [
  { NewTask: "Попить кофе", NewDate: "2019-05-03" },
  { NewTask: "Погладить кота", NewDate: "2019-05-30" },
  { NewTask: "Накормить кота", NewDate: "2019-05-01" },
  { NewTask: "Уложить спать кота", NewDate: "2019-05-10" }
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

  let div = document.createElement("div");
  div.className = "div-out";
  div.innerHTML = NewTask;
  listItem.appendChild(div);
}

function OutTask() {
  for (let key = 0; key < todoList.length; key++) {
    let div = document.createElement("div");
    div.className = "div-out";
    div.innerHTML = todoList[key].NewTask + todoList[key].NewDate;
    listItem.appendChild(div);
  }
}
buttonAdd.addEventListener("click", onclick);

window.onload = function() {
  OutTask();
};
