// Module purpose: Manage tasks in the DOM.
import {events} from "./events";
import {toggleClass, createElement} from './helpers';

// Store tasks container div in a vairable.
const tasksContainer = document.querySelector('#tasks-container');

// Fn to add a new task to the DOM.
function displayTask(task, color) {
    // Create parent task element and add class.
    const taskEl = createElement('div', '', 'task');

    // Create and append checkbox to div element.
    const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        // Add event listener to checkbox to toggle completion in tasks.js.
        checkbox.addEventListener('click', () => events.emit('checkboxClicked', task));
        // Add event listener to add style class when task is toggled complete.
        checkbox.addEventListener('click', () => toggleClass(taskEl, 'complete'));
        // Style checkbox with proj color if displaying All Tasks.
        if (color) {
            checkbox.style.boxShadow = '-1px 1px 5px ' + color;
        }
    taskEl.appendChild(checkbox);

    // Create and append p element with task name.
    const name = createElement('div', task.name, 'task-card-name');
        // Add click listener to display tasks details.
        name.addEventListener('click', () => displayTaskDetails(task, taskEl));
    taskEl.appendChild(name);

    // Create due date element.
    const dateTxt = task._dueDate ? task.dueDate : '';
    const dueDate = createElement('div', dateTxt, 'task-card-date');
    taskEl.appendChild(dueDate);

    // Check if task is complete and add complete styles if so.
    if (task.isComplete) toggleClass(taskEl, 'complete');

    // Append parent task element to container.
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
    if (project.name === 'All Tasks') { // If Master Project
        // Display each task from each project.
        project.projects.forEach(childProject => {
            childProject.tasks.forEach(task => displayTask(task, childProject.color));
        });
    }
    // If normal project, and for unsorted masterProject tasks.
    project.tasks.forEach(task => displayTask(task));
}
events.on('projectSwitched', displayAllTasks);

function displayTaskDetails(task, taskEl) {
    // Create parent div element and add class.
    const detailsEl = createElement('div', '', 'task-details');

    // Add task name.
    const name = createElement('h2', task.name, 'details-name');
    detailsEl.appendChild(name);

    // Add due date.
    const dateTxt = task._dueDate ? task.dueDate : 'No Due Date';
    const dueDate = createElement('div', dateTxt, 'details-date');
    detailsEl.appendChild(dueDate);

    // Add button to hide details.
    const backBtn = createElement('button', '<<');
        // When button is clicked, remove details div.
        backBtn.addEventListener('click', () => tasksContainer.removeChild(detailsEl));
    detailsEl.appendChild(backBtn);

    // Add edit button.
    const editBtn = createElement('button', 'Edit');
        // When button is clicked, add event listener...
        // Event listener here.
    detailsEl.appendChild(editBtn);

    // Add delete button.
    const deleteBtn = createElement('button', 'Delete');
        // When button is clicked, remove details div,
        deleteBtn.addEventListener('click', () => tasksContainer.removeChild(detailsEl));
        // remove task div,
        deleteBtn.addEventListener('click', () => tasksContainer.removeChild(taskEl));
        // and emit event to remove task from project.
        deleteBtn.addEventListener('click', () => events.emit('taskDeleted', task));
    detailsEl.appendChild(deleteBtn);

    // Add priority info.
    const priority = document.createElement('div', 'Priority: ' + task.priority);
    detailsEl.appendChild(priority);

    // Add task description.
    const desc = createElement('p', task.desc, 'details-desc');
    detailsEl.appendChild(desc);

    // Append parent details element to container.
    tasksContainer.appendChild(detailsEl);
}

export {displayTask};