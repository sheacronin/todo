// Module purpose: Manage tasks in the DOM.
import {events} from "./events";
import {toggleClass} from './index';

// Store tasks container div in a vairable.
const tasksContainer = document.querySelector('#tasks-container');

// Fn to add a new task to the DOM.
function displayTask(task, color) {
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
    checkbox.addEventListener('click', () => toggleClass(taskEl, 'complete'));
    // Style checkbox with proj color if displaying All Tasks.
    if (color) {
        checkbox.style.boxShadow = '-1px 1px 5px ' + color;
    }
    taskEl.appendChild(checkbox);

    // Create and append p element with task name.
    const name = document.createElement('div');
    name.classList.add('task-card-name');
    name.textContent = task.name;
    // Add click listener to display tasks details.
    name.addEventListener('click', () => displayTaskDetails(task, taskEl));
    taskEl.appendChild(name);

    // Create due date element.
    (function addDueDate() {
        const dueDate = document.createElement('div');
        dueDate.classList.add('task-card-date');
        dueDate.textContent = task._dueDate ? task.dueDate : '';
        taskEl.appendChild(dueDate);
    })();

    // Check if task is complete and add complete styles if so.
    if (task.isComplete) toggleClass(taskEl, 'complete');

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
    // Create div element and add class.
    const detailsEl = document.createElement('div');
    detailsEl.classList.add('task-details');

    // Add task name.
    const name = document.createElement('h2');
    name.classList.add('details-name');
    name.textContent = task.name;
    detailsEl.appendChild(name);

    // Add due date.
    (function addDueDate() {
        const dueDate = document.createElement('div');
        dueDate.classList.add('details-date');
        dueDate.textContent = task._dueDate ? task.dueDate : '';
        detailsEl.appendChild(dueDate);
    })();

    // Add button to hide details.
    const backBtn = document.createElement('button');
    backBtn.textContent = '<<';
    // When button is clicked, remove details div.
    backBtn.addEventListener('click', () => tasksContainer.removeChild(detailsEl));
    detailsEl.appendChild(backBtn);

    // Add edit button.
    (function addEditBtn() {
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        // When button is clicked...
        // emit event....
        // editBtn.addEventListener('click', () => events.emit('taskDeleted', task));
        detailsEl.appendChild(editBtn);
    })();

    // Add delete button.
    (function addDeleteBtn() {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        // When button is clicked...
        // remove details div,
        deleteBtn.addEventListener('click', () => tasksContainer.removeChild(detailsEl));
        // remove task div,
        deleteBtn.addEventListener('click', () => tasksContainer.removeChild(taskEl));
        // and emit event to remove task from project.
        deleteBtn.addEventListener('click', () => events.emit('taskDeleted', task));
        detailsEl.appendChild(deleteBtn);
    })();

    // Add priority info.
    (function addPriority() {
        const priority = document.createElement('div');
        priority.textContent = 'Priority: ' + task.priority;
        detailsEl.appendChild(priority);
    })();

    // Add task description.
    const desc = document.createElement('p');
    desc.textContent = task.desc;
    desc.classList.add('details-desc');
    detailsEl.appendChild(desc);

    // Add edit button
    (function addEditBtn() {
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit Task';
    })();

    // Append details element to container.
    tasksContainer.appendChild(detailsEl);
}

export {displayTask};