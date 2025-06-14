
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const reminderInput = document.getElementById('reminderInput');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('moonTasks')) || [];

function saveTasks() {
  localStorage.setItem('moonTasks', JSON.stringify(tasks));
}

function showTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('completed');

    const label = document.createElement('div');
    label.className = 'task-label';
    label.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleTask(${index})" />
      <span>${task.text}</span>
    `;

    const meta = document.createElement('div');
    meta.className = 'task-meta';
    meta.textContent = task.time ? '🕒 ' + new Date(task.time).toLocaleString() : '';

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = '❌';
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(label);
    if (task.time) li.appendChild(meta);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  showTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  showTasks();
}

function checkReminders() {
  const now = new Date().getTime();
  tasks.forEach((task, index) => {
    if (task.time && !task.notified) {
      const taskTime = new Date(task.time).getTime();
      if (now >= taskTime) {
        alert("Reminder: " + task.text);
        task.notified = true;
        saveTasks();
      }
    }
  });
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  const time = reminderInput.value;
  if (!text) return;
  tasks.push({ text, time, done: false, notified: false });
  saveTasks();
  showTasks();
  taskForm.reset();
});

setInterval(checkReminders, 60000);
showTasks();
