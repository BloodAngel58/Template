let todoList = [];

const listItem = document.getElementById("todoListItem");
const buttonAddTask = document.getElementById("buttonAddTask");
const textInput = document.getElementById("inputTextTask");
const dateInput = document.getElementById("inputDateTask");
document.getElementById("filterText").addEventListener("input", filter);
document.getElementById("filterDate").addEventListener("input", filter);

buttonAddTask.addEventListener("click", addTask);
document.querySelector(".listItem").addEventListener("click", updatCheck, true);
document.getElementById("sortOptions").addEventListener("change", sortItem);

function showError(container, errorMessage) {
  let divErrorMassage = document.createElement("div");
  divErrorMassage.innerHTML = errorMessage;
  divErrorMassage.classList.add("error");
  if (container.classList != "error") {
    container.classList.add("error");
    container.parentNode.appendChild(divErrorMassage);
  }
}

function deletError(textNode, dateNode) {
  textNode.parentNode.removeChild(textNode.parentNode.children[1]);
  dateNode.parentNode.removeChild(dateNode.parentNode.children[1]);
  textNode.classList = "";
  dateNode.classList = "";
}

function addTask() {
  let validate = false;
  let idTask = ID();
  let title = textInput.value;
  let date = dateInput.value;
  if (!textInput.value || !dateInput.value) {
    if (!textInput.value) {
      showError(textInput, "Отсутствует ТЕКС.");
    }
    if (!dateInput.value) {
      showError(dateInput, "Отсутствует ДАТА.");
    }
  } else validate = true;
  if (validate) {
    todoList.push({
      idTask,
      title,
      date
    });
    addItem(title, date, idTask);
    addTaskFromStorage();
    clearInput();
    sortItem();
    deletError(textInput, dateInput);
  }
}
function addTaskFromStorage() {
  localStorage.setItem("todo", JSON.stringify(todoList));
}

function sortItem() {
  const sortSelector = document.getElementById("sortOptions");
  const selectInd = sortSelector.options.selectedIndex;
  const collator = new Intl.Collator();
  const cloneTodoList = [...todoList];
  switch (selectInd) {
    case 0: // сортировка по алфавиту
      clearTodoList(todoList);
      break;
    case 1: // сортировка по алфавиту
      cloneTodoList.sort(function(a, b) {
        return collator.compare(a.title, b.title);
      });
      clearTodoList(cloneTodoList);
      break;

    case 2: // сортировка по алфавиту в обратном порядке
      cloneTodoList.sort(function(a, b) {
        return collator.compare(b.title, a.title);
      });
      clearTodoList(cloneTodoList);

      break;
    case 3: // сортировка по дате
      cloneTodoList.sort(function(a, b) {
        return dateFilter(a.date) - dateFilter(b.date);
      });
      clearTodoList(cloneTodoList);
      break;

    case 4: // сортировка по дате в обратном порядке
      cloneTodoList.sort(function(a, b) {
        return dateFilter(b.date) - dateFilter(a.date);
      });
      clearTodoList(cloneTodoList);
      break;
  }
}

function filter() {
  let filterText = document.getElementById("filterText").value;
  let filterDate = document.getElementById("filterDate").value;

  if (filterText || filterDate) {
    const filterArr = todoList.filter(task => {
      if (filterText && filterDate) {
        if (
          task.title.indexOf(filterText) != -1 &&
          (task.date === filterDate) != -1
        )
          return task.title && task.date === filterDate;
      } else if (filterText) {
        if (task.title.indexOf(filterText) != -1) return task.title;
      } else if (filterDate) {
        return task.date === filterDate;
      }
    });
    clearTodoList(filterArr);
  } else if (!filterText && !filterDate) {
    clearTodoList(todoList);
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
  addTaskFromStorage();
}

function dateFilter(s) {
  let a = s.split(/-|\//);
  return new Date(a[2], a[1] - 1, a[0]);
}

function clearTodoList(taskList) {
  listItem.innerHTML = "";
  loadItem(taskList);
}

function loadItem(taskList) {
  for (let key = 0; key < taskList.length; key++) {
    addItem(taskList[key].title, taskList[key].date, taskList[key].idTask);
  }
}

function downloadFromStorage() {
  todoList = JSON.parse(localStorage.getItem("todo"));
  loadItem(todoList);
}

window.onload = function() {
  if (localStorage.getItem("todo")) {
    downloadFromStorage();
  }
};
