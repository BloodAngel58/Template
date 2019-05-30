const todoList = [{
    idTask: 1,
    title: "Попить кофе",
    date: "2019-05-01"
  },
  {
    idTask: 2,
    title: "Погладить кота",
    date: "2019-05-02"
  },
  {
    idTask: 3,
    title: "Накормить кота",
    date: "2019-05-03"
  },
  {
    idTask: 4,
    title: "Уложить кота спать",
    date: "2019-05-04"
  }
];

const listItem = document.getElementById("todoListItem");
const buttonAddTask = document.getElementById("buttonAddTask");
const textInput = document.getElementById("inputTextTask");
const dateInput = document.getElementById("inputDateTask");
document.getElementById("filterText").addEventListener("input", filter);
document.getElementById("filterDate").addEventListener("input", filter);

buttonAddTask.addEventListener("click", addTask);
document.querySelector(".listItem").addEventListener("click", updatCheck, true);
document.getElementById("sortOptions").addEventListener("change", sortItem);

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
    addItem(title, date, idTask);
    clearInput();
    sortItem();
  }
}

function sortItem() {
  const sortSelector = document.getElementById("sortOptions");
  const selectInd = sortSelector.options.selectedIndex;
  const collator = new Intl.Collator();
  const cloneTodoList = [...todoList];
  switch (selectInd) {
    case 0: // сортировка по алфавиту
      clearTodoLiest(todoList);
      break;
    case 1: // сортировка по алфавиту
      cloneTodoList.sort(function (a, b) {
        return collator.compare(a.title, b.title);
      });
      clearTodoLiest(cloneTodoList);
      break;

    case 2: // сортировка по алфавиту в обратном порядке
      cloneTodoList.sort(function (a, b) {
        return collator.compare(b.title, a.title);
      });
      clearTodoLiest(cloneTodoList);

      break;
    case 3: // сортировка по дате
      cloneTodoList.sort(function (a, b) {
        return dateFilter(a.date) - dateFilter(b.date);
      });
      clearTodoLiest(cloneTodoList);
      break;

    case 4: // сортировка по дате в обратном порядке
      cloneTodoList.sort(function (a, b) {
        return dateFilter(b.date) - dateFilter(a.date);;
      });
      clearTodoLiest(cloneTodoList);
      break;
  }
}


function filter() {
  let filterText = document.getElementById("filterText").value;
  let filterDate = document.getElementById("filterDate").value;

  if (filterText || filterDate) {
    const filterArr = todoList.filter(task => {
      if (filterText && filterDate) {
        return ~task.title.indexOf(filterText) && task.date === filterDate;
      } else if (filterText) {
        return ~task.title.indexOf(filterText);
      } else if (filterDate) {
        return task.date === filterDate;
      }

    });
    clearTodoLiest(filterArr);

  } else if (!filterText && !filterDate) {
    clearTodoLiest(todoList);
  }
}

var ID = function () {
  return Math.random()
    .toExponential(36)
    .substr(2, 9);
};

function clearInput() {
  textInput.value = "";
  dateInput.value = "";
}

function addItem(title, date, key) {
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



function dateFilter(s) {
  let a = s.split(/-|\//);
  return new Date(a[2], a[1] - 1, a[0]);
}

function clearTodoLiest(taskList) {
  listItem.innerHTML = "";
  loadItem(taskList);
}

function loadItem(taskList) {
  for (let key = 0; key < taskList.length; key++) {
    addItem(taskList[key].title, taskList[key].date, taskList[key].idTask);
  }
}

window.onload = function () {
  loadItem(todoList);
};