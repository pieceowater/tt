const taskInput = document.getElementById("task");
const dateInput = document.getElementById("date");
const taskList = document.getElementById("taskList");
let tasks = [];

function addTask() {
  const taskName = taskInput.value.trim();

  if (taskName === "") {
    return;
  }

  const task = {
    id: Date.now(),
    name: taskName,
    date: dateInput.value,
  };
  tasks.push(task);
  saveTasks();
  renderTask(task);
  taskInput.value = "";
  dateInput.value = "";
}

function deleteTask(event) {
  const taskId = parseInt(event.target.parentNode.dataset.id);
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  event.target.parentNode.remove();
}

function renderTask(task) {
  const taskEl = document.createElement("li");
  taskEl.dataset.id = task.id;
  taskEl.innerHTML = `<span class="taskName">${task.name}</span><span class="taskDate">${task.date}</span><span class="deleteTask" onclick="deleteTask(event)">X</span>`;
  taskList.appendChild(taskEl);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);

    for (const task of tasks) {
      renderTask(task);
    }
  }
}

loadTasks();
