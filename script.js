const user = localStorage.getItem("moonUser");
const greeting = document.getElementById("greeting");

if (!user) {
  window.location.href = "login.html";
} else {
  greeting.textContent = `Hello, ${user} 🌙`;
}

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("moonTasks")) || [];
renderTasks();

function addTask() {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, done: false });
    taskInput.value = "";
    updateTasks();
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  updateTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasks();
}

function updateTasks() {
  localStorage.setItem("moonTasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "checked" : "";
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})" style="background:#ff4d4d; border:none; padding:6px 10px; border-radius:6px; color:white; font-weight:bold;">×</button>
    `;
    taskList.appendChild(li);
  });
}

function logout() {
  localStorage.removeItem("moonUser");
  localStorage.removeItem("moonTasks");
  window.location.href = "login.html";
}
