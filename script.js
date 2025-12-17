// ===== Todo List App Logic (with localStorage persistence) =====

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage (or start empty)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks on the page
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <div>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Add a new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  taskInput.value = "";

  saveTasks();
  renderTasks();
}

// Toggle completed/uncompleted
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;

  saveTasks();
  renderTasks();
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);

  saveTasks();
  renderTasks();
}

// Edit a task
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);

  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();

    saveTasks();
    renderTasks();
  }
}

// Button click + Enter key support
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// Initial render when page loads
renderTasks();
