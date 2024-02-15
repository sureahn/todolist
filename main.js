// user enter task
// click +, add task
// click delete, delete task
// click check, task end and strikethrough(finish)
// 1.  If click check, true or false
// 2. True > consider it is finished, and show strikethrough
// 3. False > consider it is not finish.

// click not Done or Done tab, under bar move to that tab
// Not done tab only not done items, Done tab only Done items
// All tab include all tab



let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div") // 조건에 만족하는 모든걸 가져옴
let taskList = [];
addButton.addEventListener("click", addTask); //(event,function)


for (let i=1;i<tabs.length;i++) {
  tabs[i].addEventListener("click", function(event){
    filter(event)})
}

function addTask() {

    let task = { //Object: additional information
      id: randomIDGenerate(),
      taskContent: taskInput.value,
      isComplete: false,
    };
    taskList.push(task);
    console.log("taskList"); //function check
    render();
}

function render() {
    let resultHTML = "";
    for (let i=0;i<taskList.length;i++){
      if (taskList[i].isComplete == true) {
        resultHTML+=`<div class="task">
        <div class="task-done">${taskList[i].taskContent}</div> 
        <div>
          <button onclick="toggleComplete('${taskList[i].id}')">
            <i class="fa-solid fa-rotate-left"></i>
          </button>
          <button onclick="deleteTask('${taskList[i].id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>`;
    } else {
      resultHTML += `
        <div class="task">
            <div class="">${taskList[i].taskContent}</div> 
            <div>
            <button onclick="toggleComplete('${taskList[i].id}')">
              <i class="fa-solid fa-check"></i>
          </button>
              <button onclick="deleteTask('${taskList[i].id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>`; 

    }   
  }
    document.getElementById("task-board").innerHTML = resultHTML;
}



function toggleComplete(id) {
  console.log("id:",id);
  for (let i=0; i<taskList.length;i++){
    if(taskList[i].id == id) { //아이디 찾으면  다른거 안봐도 됨
      taskList[i].isComplete = !taskList[i].isComplete //현재값의 반대값 
      break; // finish for~
    }
  }
  render()
  console.log(taskList); 
}

function deleteTask(id) {
  for(let i=0;i<taskList.length;i++) {
    if(taskList[i].id == id) { //아이디 찾으면  다른거 안봐도 됨
      taskList.splice(i,1); //i번째 아이템부터 1개 삭제
      break; // finish for~
    }
  }
  render();
}

function filter(event) {
  console.log("filter", event.target);
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9); //결과물이 다른곳에 쓰이면 return
}