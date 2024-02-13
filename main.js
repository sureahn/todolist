// user enter task
// click +, add task
// click delete, delete task
// click check, task end and strikethrough(finish)
// click not Done or Done tab, under bar move to that tab
// Not done tab only not done items, Done tab only Done items
// All tab include all tab


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click", addTask); //(event,function)

function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log("taskList"); //function check
    render();
}

function render() {
    let resultHTML = '';
    for (let i=0;i<taskList.length;i++){
        resultHTML += `
        <div class="task">
            <div>${taskList[i]}</div>ss
            <div>
              <button>Check</button>
              <button>Delete</button>
            </div>
          </div>`
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

