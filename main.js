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
let mode = 'all'; //전역변수로 선언해서 어디서든 쓸 수 있음
let filterList = [];

addButton.addEventListener("click", addTask); //(event,function)
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

let underLine = document.getElementById("under-line");
let underMenu = document.querySelectorAll(".task-tabs div");
let taskTabs = document.querySelector(".task-tabs");

underMenu.forEach((menu, index) =>
  menu.addEventListener("click", (e) => underIndicator(e, index))
);

function underIndicator(e, index) {
  let tabWidth = taskTabs.offsetWidth / 3; // 전체 탭 너비의 33.3%
  let leftPosition = index * tabWidth; // 각 메뉴 항목의 left 위치
  
  underLine.style.transition = "left 0.3s"; // Add transition property
  
  underLine.style.left = leftPosition + "px";
  underLine.style.width = tabWidth + "px"; // 각 메뉴 항목의 너비 설정
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 5 + "px";
}

// function addTask() {
//   let task = {
//     id: randomIDGenerate(),
//     taskContent: taskInput.value,
//     isComplete: false,
//   };
//   taskList.push(task);
//   console.log("taskList", taskList); // check function

//   render(mode); // 현재 모드에 따라서 렌더링

//   taskInput.value = ""; // 입력란 초기화
// }

function addTask() {
  let taskContent = taskInput.value.trim(); // 입력된 내용의 앞뒤 공백을 제거

  // taskContent가 빈 문자열인 경우 경고 메시지를 표시하고 함수 종료
  if (taskContent === "") {
      alert("Please write your task");
      return;
  }

  let task = {
      id: randomIDGenerate(),
      taskContent: taskContent,
      isComplete: false,
  };
  taskList.push(task);
  console.log("taskList", taskList); // check function

  render("all"); // "all" 모드로 렌더링

  taskInput.value = ""; // 입력란 초기화
}

function render(mode) {
  // 내가 선택한 탭에 따라서
  let list = [];
  if (mode === "all") {
    list = taskList; // "all" 탭에서는 모든 작업을 표시
  } else if (mode === "doing") {
    list = taskList.filter(task => !task.isComplete);
  } else if (mode === "done") {
    list = taskList.filter(task => task.isComplete);
  }

  // 리스트를 달리보여준다
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task">
          <div class="task-done">${list[i].taskContent}</div> 
          <div>
          <button onclick="toggleComplete('${list[i].id}', '${mode}')">
          <i class="fa-solid fa-rotate-left"></i>
          </button>
          <button onclick="deleteTask('${list[i].id}', '${mode}')">
          <i class="fa-solid fa-trash"></i>
          </button>
          </div>
          </div>`;
    } else {
      resultHTML += `
          <div class="task">
          <div class="">${list[i].taskContent}</div> 
          <div>
          <button onclick="toggleComplete('${list[i].id}', '${mode}')">
          <i class="fa-solid fa-check"></i>
          </button>
          <button onclick="deleteTask('${list[i].id}', '${mode}')">
          <i class="fa-solid fa-trash"></i>
          </button>
          </div>
          </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;

  // 탭을 변경할 때 현재 선택된 탭을 유지하기 위해 필요한 코드
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].id === mode) {
      tabs[i].classList.add("active");
    } else {
      tabs[i].classList.remove("active");
    }
  }
}


function toggleComplete(id, mode) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      // 해당 태스크의 완료 상태를 변경합니다.
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render(mode); // 현재 모드에 따라서 다시 렌더링합니다.
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      // 아이디 찾으면 다른거 안봐도 됨
      taskList.splice(i, 1); // i번째 아이템부터 1개 삭제
      break; // finish for~
    }
  }
  render(mode); // 현재 선택된 탭에 맞게 다시 렌더링합니다.
}


function filter(event) {
  console.log("filter", event.target.id);

  let mode = event.target.id;

  if (mode === "all") {
    mode = 'all';
  }

  render(mode);
}



function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9); //결과물이 다른곳에 쓰이면 return
}