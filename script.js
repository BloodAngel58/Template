window.onload = function () {
    let todoList = ["Один", "Два", "Три", "Четыре"];
    elem = document.getElementById("out"); // div для вывод
    button = document.getElementById("add");
    button.addEventListener("click", onclick);
    OutTask();

    function onclick() {
        let text = document.getElementById("text").value;
        todoList.push(text);
        console.log(text)
        OutTask();
    }

    function OutTask() {
        for (let key = 0; key < todoList.length; key++) {
            let div = document.createElement('div');
            div.className = "div-out";
            div.innerText = todoList[key];
            elem.appendChild(div);
        }
    }
}