// Module purpose: Manage tasks in the DOM.
// Store tasks container div in a vairable.
const tasksContainer = document.querySelector('#tasks-container');

// Fn to add a new task to the DOM.
function addNewTask(task) {
    // Create task element and add class.
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');
    // Create and append checkbox to div element.
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    taskEl.appendChild(checkbox);
    // Create and append p element with task title.
    const title = document.createElement('p');
    title.textContent = task.title;
    taskEl.appendChild(title);
    // Append task el to container.
    tasksContainer.appendChild(taskEl);
}

// Button to add new task.
const newTaskBtn = document.querySelector('#new-task-btn');
newTaskBtn.addEventListener('click', showTaskForm);

export {addNewTask};