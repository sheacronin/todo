// Module purpose: Manage tasks in the DOM.
import {events} from "./events";
import {toggleClass, createElement, locale, convertToDate} from './helpers';
import {formatRelative} from 'date-fns';

// Store tasks container div in a vairable.
const tasksContainer = document.querySelector('#tasks-container');
const main = document.querySelector('main');

class TaskEl {
    constructor(task, color) {
        this.task = task;
        this.color = color;
        this.container = document.createElement('div'),
        this.parentEl = tasksContainer;
        this.els = {
            checkbox: (() => {
                const el = createElement('div', '', 'checkbox');
                // Style checkbox with proj color if displaying All Tasks.
                if (color) {
                    el.style.boxShadow = '-1px 1px 5px ' + color;
                }
                // Add event listener to checkbox to toggle completion in tasks.js.
                el.addEventListener('click', () => events.emit('checkboxClicked', task));

                // Style the task details name as well.
                el.addEventListener('click', () => this.toggleComplete());
                return {el};
            })(),

            name: (() => {
                const el = createElement('div', task.name, 'name');
                return {el};
            })(),

            dueDate: (() => {
                const el = createElement('div', '', 'date');

                const dateTxt = task._dueDate ? task.dueDate : 'No Due Date';
                const dateTxtEl = createElement('div', dateTxt);
                el.appendChild(dateTxtEl);

                // Fn to update date text.
                const updateTxt = (e) => {
                    console.log('input received.');
                    const dateInput = e.target.value;
                    const newDate = convertToDate(dateInput);
                    const formattedDate = formatRelative(newDate, new Date(), { locale });
                    dateTxtEl.textContent = formattedDate;
                }
                return {el, updateTxt};
            })()
        }
    }

    display() {
        console.log('displaying ' + this.task.name);
        // Loop through each el and append to container.
        for (let prop in this.els) {
            const element = this.els[prop].el;
            this.container.appendChild(element);
        }
        // Check if task is complete and add complete styles if so.
        if (this.task.isComplete) this.toggleComplete();
        // Append parent to container.
        this.parentEl.appendChild(this.container);
    }

    toggleComplete() {
        toggleClass(this.els.name.el, 'complete');
        toggleClass(this.els.checkbox.el, 'complete');
    }
}

class TaskCard extends TaskEl {
    constructor(task, color) {
        super(task, color);
        this.parentEl = tasksContainer;
        this.container.classList.add('task-card');

        // Add click listener to display tasks details.
        this.els.name.el.addEventListener('click', () => new TaskDetails(task, this.color, this).display());
    }

    update(task) {
        this.els.name.el.textContent = task.name;
        this.els.dueDate.el.textContent = task.dueDate;
    }
}
// Listen for event from tasks.js and dom-projects.js
events.on('taskAdded', ([task, color]) => new TaskCard(task, color).display());

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
            childProject.tasks.forEach(task => new TaskCard(task, childProject.color).display());
        });
    }
    // If normal project, and for unsorted masterProject tasks.
    project.tasks.forEach(task => new TaskCard(task).display());
}
events.on('projectSwitched', displayAllTasks);

class TaskDetails extends TaskEl {
    constructor(task, color, card) {
        super(task, color);
        this.card = card;
        this.parentEl = main;
        this.container.classList.add('task-details');

        // Make sure toggling complete affects the task card as well.
        this.els.checkbox.el.addEventListener('click', () => this.card.toggleComplete());

        this.els.dueDate.input = (() => {
            const input = createElement('input', '', 'hidden');
            input.setAttribute('type', 'date');
            // Add event listener to input to update dateTxt.
            input.addEventListener('input', this.els.dueDate.updateTxt);
            this.els.dueDate.el.appendChild(input);
            return input;
        })();

        // Fn to allow new date input.
        this.els.dueDate.toggleInput = () => {
            console.log('Toggling date input...');
            toggleClass(this.els.dueDate.input, 'hidden');
        }

        this.els.priority = (() => {
            const el = createElement('div', '', 'priority');

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

            return {el, circles, styleCircles} 
        })();

        this.els.desc = (() => {
            const descTxt = task.desc ? task.desc : 
                'Click the edit button to add details about your task...';
            const el = createElement('p', descTxt, 'desc');
            return {el};
        })();

        // Add button to hide details.
        this.els.backBtn = (() => {
            const el = createElement('button', '<<', 'details-back');
            if (this.color) el.style.backgroundColor = this.color;
            // When button is clicked, remove details div.
            el.addEventListener('click', () => this.parentEl.removeChild(this.container));
            return {el};
        })();

        // Add delete button.
        this.els.deleteBtn = (() => {
            const el = createElement('button', 'Delete');
            // Set ID to ensure styles override other class.
            el.setAttribute('id', 'details-delete');
            // Make init hidden.
            el.classList.add('hidden');
            el.addEventListener('click', () => console.log(task));
            // When button is clicked, remove details div,
            el.addEventListener('click', () => this.parentEl.removeChild(this.container));
            // remove task card div,
            el.addEventListener('click', () => tasksContainer.removeChild(this.card.container));
            // and emit event to remove task from project.
            el.addEventListener('click', () => events.emit('taskDeleted', task));
            return {el};
        })();

        // Add edit button.
        this.els.editBtn = (() => {
            const el = createElement('button', 'Edit', 'details-edit');
            if (this.color) el.style.backgroundColor = this.color;
            // When button is clicked, toggle delete btn display,
            el.addEventListener('click', () => toggleClass(this.els.deleteBtn.el, 'hidden'));
            // add edit button style/animation,
            el.addEventListener('click', () => toggleClass(el, 'edit-mode'));
            // and make elements editable.
            el.addEventListener('click', () => this.toggleEditMode(task));
            return {el};
        })();

        this.isEditable = false;
    }

    toggleEditMode(task) {
        this.isEditable = !this.isEditable;
        // Toggle due date input whether or not in edit mode.
        this.els.dueDate.toggleInput();

        if (this.isEditable) {
            console.log('Engaging edit mode...');
            this.els.editBtn.el.textContent = 'Done?';
            // Allow priority circles to be changed.
            this.els.priority.circles.forEach(circle => {
                circle.addEventListener('click', this.els.priority.styleCircles);
            });
    
            this.els.name.el.contentEditable = true;
            // If placeholder text, get rid of it first,
            if (!task.desc) this.els.desc.el.textContent = '';
            // then make editable.
            this.els.desc.el.contentEditable = true;
        } else {
            console.log('Stopping edit mode...');
            this.els.editBtn.el.textContent = 'Edit';
            // Stop priority circles from being able to be changed.
            this.els.priority.circles.forEach(circle => {
                circle.removeEventListener('click', this.els.priority.styleCircles);
            });
            this.els.name.el.contentEditable = false;
            this.els.desc.el.contentEditable = false;
            console.table([this.els.name.el.textContent, this.els.desc.el.textContent]);
            // Get data from user inputs.
            // Set name from name element.
            task.name = this.els.name.el.textContent;
            // Set desc from desc element.
            task.desc = this.els.desc.el.textContent;
            // IF there was user input
            if (this.els.dueDate.input.value) {
                // Set due date from the date input.
                task.dueDate = this.els.dueDate.input.value;
            }   
            // Get priority from circles.
            // Loop through each circle.
            task.priority = (() => {
                for (let i = 0; i < 3; i++) {
                    const circle = this.els.priority.circles[i];
                    // If a circle isn't filled,
                    if (!circle.classList.contains('filled-circle')) {
                        // Return the index of the circle
                        // which is the that circle's priority minus 1.
                        return i;
                    }
                }
                // If all circles are filled, the priority is 3.
                return 3;
            })();
            // Emit taskUpdated event to update local storage.
            events.emit('taskUpdated');
            console.log(task);
            // Update taskCard with new info.
            this.card.update(task);
        }
    }
}

export {TaskCard}