"use strict";

var tasks = [];
document.addEventListener('DOMContentLoaded', function () {
  var storedTasks = JSON.parse(localStorage.getItem('tasks'));

  if (storedTasks) {
    storedTasks.forEach(function (task) {
      return tasks.push(task);
    });
    updateTasksList();
    updateStats();
  }
});

var saveTasks = function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

var addTask = function addTask() {
  var taskInput = document.getElementById('taskInput');
  var text = taskInput.value.trim();

  if (text) {
    tasks.push({
      text: text,
      completed: false
    });
    taskInput.value = "";
    updateTasksList();
    updateStats();
    saveTasks();
  }
};

var toggleTaskComplete = function toggleTaskComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

var deleteTask = function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

var editTask = function editTask(index) {
  var taskInput = document.getElementById('taskInput');
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

var updateStats = function updateStats() {
  var completeTasks = tasks.filter(function (task) {
    return task.completed;
  }).length;
  var totalTasks = tasks.length;
  var progress = totalTasks > 0 ? completeTasks / totalTasks * 100 : 0;
  var progressBar = document.getElementById('progress');
  progressBar.style.width = "".concat(progress, "%");
  var numbersElement = document.getElementById('numbers');
  numbersElement.textContent = "".concat(completeTasks, " / ").concat(totalTasks);
};

var updateTasksList = function updateTasksList() {
  var taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach(function (task, index) {
    var listItem = document.createElement('li');
    listItem.innerHTML = "\n        <div class=\"taskitem\">\n            <div class=\"task ".concat(task.completed ? 'completed' : '', "\">\n                <input type=\"checkbox\" class=\"checkbox\" ").concat(task.completed ? "checked" : "", " onclick=\"toggleTaskComplete(").concat(index, ")\"/>\n                <p>").concat(task.text, "</p>\n            </div>\n            <div class=\"icons\">\n                <img src=\"./img/edit.png\" onclick=\"editTask(").concat(index, ")\"/>\n                <img src=\"./img/bin.png\" onclick=\"deleteTask(").concat(index, ")\"/>\n            </div>\n        </div>");
    taskList.appendChild(listItem);
  });
};

document.getElementById('newTask').addEventListener('click', function (e) {
  e.preventDefault();
  addTask();
});
//# sourceMappingURL=app.dev.js.map
