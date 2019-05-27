window.onload = function () {
    var todoList = [];
    OutTask();
    document.getElementById("add").onclick = function () {
        let text = document.getElementById("text").value;
        let i = todoList.length;
        todoList[i] = text;
        OutTask();
        //console.log(text);
    }

    function OutTask() {
        let OutText = "";
        elem = document.getElementById("out");
        for (let key = 0; key < todoList.length; key++) {
            OutText += todoList[key] + '<br>';
        }
        elem.innerHTML = OutText;

    }
}