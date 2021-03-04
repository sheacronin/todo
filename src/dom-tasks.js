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
    taskEl.appendChild(checkbox);
    // Create and append p element with task title.
    const title = document.createElement('p');
    title.textContent = task.title;
    taskEl.appendChild(title);
    // Add click listener to display tasks details.
    taskEl.addEventListener('click', displayTaskDetails);
    // Append task element to container.
    tasksContainer.appendChild(taskEl);
}

function displayTaskDetails() {
    console.log('you clicked me.');
    const detailsEl = document.createElement('div');
    detailsEl.classList.add('task-details');
    // Append details element to container.
    tasksContainer.appendChild(detailsEl);
}

// Listen for event from tasks.js
events.on('taskCreated', displayTask);

export {displayTask};