const todoList = ["Один", "Два", "Три", "Четыре"];
let listItem = document.getElementById("ListItem"); // div для вывод
let buttonAdd = document.getElementById("add");

function onclick() {
  let NewTask = document.getElementById("text").value;
  todoList.push(NewTask);

  let div = document.createElement("div");
  div.className = "div-out";
  div.innerHTML = NewTask;
  listItem.appendChild(div);
}

function OutTask() {
  for (let key = 0; key < todoList.length; key++) {
    let div = document.createElement("div");
    div.className = "div-out";
    div.innerHTML = todoList[key];
    listItem.appendChild(div);
  }
}
buttonAdd.addEventListener("click", onclick);

window.onload = function() {
  OutTask();
};
