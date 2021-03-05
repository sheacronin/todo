// Module purpose: Manage tasks in the DOM.

import { events } from "./events";

// Store tasks container div in a vairable.
const tasksContainer = document.querySelector('#tasks-container');

// Fn to add a new task to the DOM.
function displayTask(task) {
    // Create task element and add class.
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');
    // Create and append checkbox to div element.
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    // Add event listener to checkbox to toggle completion in tasks.js.
    checkbox.addEventListener('click', () => events.emit('checkboxClicked', task));
    // Add event listener to add style class when task is toggled complete.
    checkbox.addEventListener('click', toggleCompleteStyles);
    taskEl.appendChild(checkbox);
    // Create and append p element with task title.
    const title = document.createElement('p');
    title.textContent = task.title;
    // Add click listener to display tasks details.
    title.addEventListener('click', () => displayTaskDetails(task));
    taskEl.appendChild(title);
    // Append task element to container.
    tasksContainer.appendChild(taskEl);
}

function displayTaskDetails(task) {
    // Create div element and add class.
    const detailsEl = document.createElement('div');
    detailsEl.classList.add('task-details');
    // Add task title.
    const title = document.createElement('h2');
    title.textContent = task.title;
    detailsEl.appendChild(title);
    // Add button to hide details.
    const backBtn = document.createElement('button');
    backBtn.textContent = 'Go back';
    // When button is clicked, remove details div.
    backBtn.addEventListener('click', () => tasksContainer.removeChild(detailsEl));
    detailsEl.appendChild(backBtn);
    // Add task description.
    const desc = document.createElement('p');
    desc.textContent = task.desc;
    detailsEl.appendChild(desc);
    // Append details element to container.
    tasksContainer.appendChild(detailsEl);
}

function toggleCompleteStyles(e) {
    // Store task div in variable.
    const task = e.target.parentNode;
    // Decide if complete class needs to be removed or added.
    const action = task.classList.contains('complete') ? 'remove' : 'add';
    // Remove/add the class.
    task.classList[action]('complete');
}

// Listen for event from tasks.js
events.on('taskCreated', displayTask);

export {displayTask};