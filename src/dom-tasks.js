// Module purpose: Manage tasks in the DOM.
import {events} from "./events";
import {toggleClass, createElement, locale, convertToDate} from './helpers';
import {formatRelative} from 'date-fns';

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


// taskDetails as a factory function.
const taskDetails = (task, taskEl) => {
    const container = createElement('div', '', 'task-details');

    let isEditable = false;

    const toggleEditMode = () => {
        isEditable = !isEditable;
        // Toggle due date input whether or not in edit mode.
        els.dueDate.toggleInput();

        if (isEditable) {
            console.log('Engaging edit mode...');
            // Allow priority circles to be changed.
            els.priority.circles.forEach(circle => {
                circle.addEventListener('click', els.priority.styleCircles);
            });
    
            els.name.contentEditable = true;
            els.desc.contentEditable = true;
            // Store all this above data in variables.?
        } else {
            console.log('Stopping edit mode...');
            // Stop priority circles from being able to be changed.
            els.priority.circles.forEach(circle => {
                circle.removeEventListener('click', els.priority.styleCircles);
            });
            els.name.contentEditable = false;
            els.desc.contentEditable = false;
            // Get data from user inputs.
            // Emit taskUpdated event with the updated data.
            // tasks.js will use setters to update.
        }
    }

    const els = (() => {
        const priority = (() => {
            const main = createElement('div', '', 'details-priority');

            // Add label.
            const priorityLabel = createElement('div', 'Priority:', 'priority-label');
            main.appendChild(priorityLabel);

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
                main.appendChild(circle);
            }

            const styleCircles = (e) => {
                const newPriority = e.target.dataset.num;
                // Loop through each circle.
                for (let i = 0; i < circles.length; i++) {
                    const circle = circles[i];
                    // If circle should be filled for this new priority
                    if ((circle.dataset.num <= newPriority && 
                        // And is not yet filled
                        !circle.classList.contains('filled-circle')) ||
                        // OR if circle shouldn't be filled
                        (circle.dataset.num  > newPriority &&
                        // And is already filled
                        circle.classList.contains('filled-circle'))) {
                        // Toggle the filling.
                        toggleClass(circle, 'filled-circle');
                    } else { // Otherwise, don't change the style.
                        continue;
                    }
                }
            }

            return {main, circles, styleCircles} 
        })();

        const dueDate = (() => {
            const main = createElement('div', '', 'details-date');

            const dateTxt = task._dueDate ? task.dueDate : 'No Due Date';
            const dateTxtEl = createElement('div', dateTxt);
            main.appendChild(dateTxtEl);

            // Fn to update date text.
            const updateTxt = (e) => {
                console.log('input received.');
                const dateInput = e.target.value;
                const newDate = convertToDate(dateInput);
                const formattedDate = formatRelative(newDate, new Date(), { locale });
                dateTxtEl.textContent = formattedDate;
            }

            const input = createElement('input', '', 'hidden');
            input.setAttribute('type', 'date');
            // Add event listener to input to update dateTxt.
            input.addEventListener('input', updateTxt);
            main.appendChild(input);

            // Fn to allow new input.
            const toggleInput = () => {
                console.log('Toggling date input...');
                toggleClass(input, 'hidden');
            }

            return {main, toggleInput};
        })();

        const checkbox = (() => {
            const checkbox = createElement('div', '', 'details-checkbox');
            // Add event listener to checkbox to toggle completion in tasks.js.
            checkbox.addEventListener('click', () => events.emit('checkboxClicked', task));
            // Add event listener to add style class when task is toggled complete.
            checkbox.addEventListener('click', () => toggleClass(taskEl, 'complete'));
            // Style the task details name as well.
            checkbox.addEventListener('click', () => toggleClass(name, 'complete'));
            return checkbox;
        })();

        const name = (() => {
            const name = createElement('h2', task.name, 'details-name');
            // Check if task is complete and add complete styles if so.
            if (task.isComplete) name.classList.add('complete');
            return name;
        })();

        // Add task description.
        const desc = (() => {
            const descTxt = task.desc ? task.desc : 
                'Click the edit button to add details about your task...';
            const desc = createElement('p', descTxt, 'details-desc');
            return desc;
        })();

        // Add button to hide details.
        const backBtn = (() => {
            const backBtn = createElement('button', '<<', 'details-back');
            // When button is clicked, remove details div.
            backBtn.addEventListener('click', () => tasksContainer.removeChild(container));
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
            deleteBtn.addEventListener('click', () => tasksContainer.removeChild(container));
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
        for (let el in els) {
            const element = els[el];
            if (element === els.priority | element === els.dueDate) { // If els that are objs.
                container.appendChild(element.main);
            } else {
                container.appendChild(element);
            }
        }
        // Append parent to container.
        tasksContainer.appendChild(container);
    }

    return {display}
}

export {displayTask};