const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// ✅ 3.1.1 — Save tasks array to localStorage
function saveTasksToStorage() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(function (li) {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ✅ 3.1.2 — Retrieve and parse tasks from localStorage on page load
function loadTasksFromStorage() {
    const stored = localStorage.getItem('tasks');
    if (!stored) return;

    const tasks = JSON.parse(stored);
    tasks.forEach(function (task) {
        createTaskElement(task.text, task.completed);
    });
}

// Shared function to build a task <li> element
function createTaskElement(text, isCompleted = false) {
    const li = document.createElement('li');
    li.classList.add('task-item');
    if (isCompleted) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = text;
    span.classList.add('task-text');

    // Mark as complete toggle
    span.addEventListener('click', function () {
        li.classList.toggle('completed');
        saveTasksToStorage(); // save whenever status changes
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        li.remove();
        saveTasksToStorage(); // save whenever a task is deleted
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Add task
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    createTaskElement(text, false);
    saveTasksToStorage(); // save whenever a new task is added

    taskInput.value = '';
    taskInput.focus();
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
});

// ✅ Run on page load — restores saved tasks
loadTasksFromStorage();