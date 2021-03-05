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

// Listen for event from tasks.js
events.on('taskCreated', displayTask);

export {displayTask};