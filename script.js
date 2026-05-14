const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Function to add task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    taskList.appendChild(li);

    taskInput.value = "";
}

// 2.1.1 Add button logic
addBtn.addEventListener("click", addTask);

// 2.1.2 Enter key event listener
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});