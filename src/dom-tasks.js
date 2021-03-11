// Module purpose: Manage tasks in the DOM.
import {events} from "./events";
import {toggleClass} from './index';

// Store tasks container div in a vairable.
const tasksContainer = document.querySelector('#tasks-container');

// Fn to add a new task to the DOM.
function displayTask(task) {
    console.log(`displaying task ${task.name}`);
    // Create task element and add class.
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');
    // Create and append checkbox to div element.
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    // Add event listener to checkbox to toggle completion in tasks.js.
    checkbox.addEventListener('click', () => events.emit('checkboxClicked', task));
    // Add event listener to add style class when task is toggled complete.
    checkbox.addEventListener('click', (e) => toggleClass(e.target.parentNode, 'complete'));
    taskEl.appendChild(checkbox);
    // Create and append p element with task name.
    const name = document.createElement('p');
    name.textContent = task.name;
    // Add click listener to display tasks details.
    name.addEventListener('click', () => displayTaskDetails(task));
    taskEl.appendChild(name);
    // Append task element to container.
    tasksContainer.appendChild(taskEl);
}
// Listen for event from tasks.js and dom-projects.js
events.on('taskCreated', displayTask);

// Wipe out all tasks when project is switched.
function removeAllTasks() {
    // While the container has a child, remove a child.
    console.log('removing all tasks...');
    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.lastChild);
    }
}
// Listen for event from dom-projects.js
events.on('projectSwitched', removeAllTasks);

// Display new project's tasks.
function displayAllTasks(project) {
    project.tasks.forEach(task => displayTask(task));
}
events.on('projectSwitched', displayAllTasks);

function displayTaskDetails(task) {
    // Create div element and add class.
    const detailsEl = document.createElement('div');
    detailsEl.classList.add('task-details');
    // Add task name.
    const name = document.createElement('h2');
    name.textContent = task.name;
    detailsEl.appendChild(name);
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

export {displayTask};