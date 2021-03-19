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
        name.addEventListener('click', () => taskDetails(task, taskEl).display());
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

// Attempt to refactor taskDetails into a factory function.
const taskDetails = (task, taskEl) => {
    const parentEl = createElement('div', '', 'task-details');

    let isEditable = false;

    function styleCircles(e) {
        const newPriority = e.target.dataset.num;
        // Loop through each circle.
        for (let i = 0; i < priorityCircles.length; i++) {
            const circle = priorityCircles[i];
            // If circle should be filled for this new priority...
            if (circle.dataset.num <= newPriority) {
                // If it's already filled, continue.
                if (circle.classList.contains('filled-circle')) {
                    continue;
                } else { // If it's not yet filled, fill it.
                    circle.classList.add('filled-circle');
                }
            } else { // If circle should NOT be filled...
                // If it's filled, remove filled class.
                if (circle.classList.contains('filled-circle')) {
                    circle.classList.remove('filled-circle');
                } else { // If it's not filled, continue.
                    continue;
                }
            }
        }
    }

    const toggleEditMode = () => {
        isEditable = !isEditable;

        if (isEditable) {
            console.log('Engaging edit mode...');
            children.priority.circles.forEach(circle => {
                circle.addEventListener('click', children.priority.styleCircles);
            });
    
            // Due date - append a date input to the div?
    
            children.name.contentEditable = true;
            children.desc.contentEditable = true;
            // Store all this above data in variables.?
        } else {
            console.log('Stopping edit mode...');
            children.priority.circles.forEach(circle => {
                circle.removeEventListener('click', children.priority.styleCircles);
            });
            children.name.contentEditable = false;
            children.desc.contentEditable = false;
            // Get data from user inputs.
            // Emit taskUpdated event with the updated data.
            // tasks.js will use setters to update.
        }
    }

    const children = (() => {
        const priority = (() => {
            const el = createElement('div', '', 'details-priority');

            // Add label.
            const priorityLabel = createElement('div', 'Priority:', 'priority-label');
            el.appendChild(priorityLabel);

            // Add circles.
            const priorityNum = parseInt(task.priority);
            // Empty array to store circles.
            const circles = [];
            // Create 3 circles.
            for (let n = 1; n <= 3; n++) {
                const circle = createElement('div', '', 'priority-circle');
                // Add data attribute to identify the circle later.
                circle.dataset.num = n;
                // If circle number is <= priority number, fill it in.
                if (n <= priorityNum) {
                    circle.classList.add('filled-circle');
                }
                // Push into array and append to element.
                circles.push(circle);
                el.appendChild(circle);
            }

            const styleCircles = (e) => {
                const newPriority = e.target.dataset.num;
                // Loop through each circle.
                for (let i = 0; i < circles.length; i++) {
                    const circle = circles[i];
                    // If circle should be filled for this new priority...
                    if (circle.dataset.num <= newPriority) {
                        // If it's already filled, continue.
                        if (circle.classList.contains('filled-circle')) {
                            continue;
                        } else { // If it's not yet filled, fill it.
                            circle.classList.add('filled-circle');
                        }
                    } else { // If circle should NOT be filled...
                        // If it's filled, remove filled class.
                        if (circle.classList.contains('filled-circle')) {
                            circle.classList.remove('filled-circle');
                        } else { // If it's not filled, continue.
                            continue;
                        }
                    }
                }
            }

            return {el, circles, styleCircles} 
        })();

        const dueDate = (() => {
            const dateTxt = task._dueDate ? task.dueDate : 'No Due Date';
            const dueDate = createElement('div', dateTxt, 'details-date');
            return dueDate;
        })();

        const checkbox = (() => {
            const checkbox = createElement('div', '', 'details-checkbox');
            // Add event listener to checkbox to toggle completion in tasks.js.
            checkbox.addEventListener('click', () => events.emit('checkboxClicked', task));
            // Add event listener to add style class when task is toggled complete.
            checkbox.addEventListener('click', () => toggleClass(taskEl, 'complete'));
            return checkbox;
        })();

        const name = createElement('h2', task.name, 'details-name');

        // Add task description.
        const desc = createElement('p', task.desc, 'details-desc');

        // Add button to hide details.
        const backBtn = (() => {
            const backBtn = createElement('button', '<<', 'details-back');
            // When button is clicked, remove details div.
            backBtn.addEventListener('click', () => tasksContainer.removeChild(parentEl));
            return backBtn;
        })();

        // Add delete button.
        const deleteBtn = (() => {
            const deleteBtn = createElement('button', 'Delete');
            // Set ID to ensure styles override other class.
            deleteBtn.setAttribute('id', 'details-delete');
            // Make init hidden.
            deleteBtn.classList.add('hidden');
            // When button is clicked, remove details div,
            deleteBtn.addEventListener('click', () => tasksContainer.removeChild(parentEl));
            // remove task div,
            deleteBtn.addEventListener('click', () => tasksContainer.removeChild(taskEl));
            // and emit event to remove task from project.
            deleteBtn.addEventListener('click', () => events.emit('taskDeleted', task));
            return deleteBtn;
        })();

        // Add edit button.
        const editBtn = (() => {
            const editBtn = createElement('button', 'Edit', 'details-edit');
            // When button is clicked, toggle delete btn display,
            editBtn.addEventListener('click', () => toggleClass(deleteBtn, 'hidden'));
            // add edit button style/animation,
            // ----- code here -----
            // and make elements editable.
            editBtn.addEventListener('click', toggleEditMode);
            return editBtn;
        })();

        return {priority, dueDate, checkbox, name, desc,
                backBtn, deleteBtn, editBtn}
    })();

    const display = () => {
        console.log('displaying...');
        // Loop through each child el and append to parent.
        for (let el in children) {
            const child = children[el];
            if (child === children.priority) { // If priority, which is an obj.
                parentEl.appendChild(child.el);
            } else {
                parentEl.appendChild(child);
            }
        }
        // Append parent to container.
        tasksContainer.appendChild(parentEl);
    }

    return {display}
}

export {displayTask};