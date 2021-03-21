// Module purpose: Manage tasks in the DOM.
import {events} from "./events";
import {toggleClass, createElement, locale, convertToDate} from './helpers';
import {formatRelative} from 'date-fns';

// Store tasks container div in a vairable.
const tasksContainer = document.querySelector('#tasks-container');

class TaskEl {
    constructor(task, color) {
        this.container = document.createElement('div'),
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
                el.addEventListener('click', () => toggleClass(this.els.name.el, 'complete'));
                return {el};

                // THESE FNS FOR SPECIFIC TASKCARD / TASKDETAILS

                // // Add event listener to add style class when task is toggled complete.
                // checkbox.addEventListener('click', () => toggleClass(taskEl, 'complete'));
                // // Add event listener to add style class when task is toggled complete.
                // checkbox.addEventListener('click', () => toggleClass(card, 'complete'));
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
        // Loop through each el and append to container.
        for (let prop in this.els) {
            const element = this.els[prop].el;
            this.container.appendChild(element);
        }
        // Check if task is complete and add complete styles if so.
        // this should be different for cards vs. details?
        if (task.isComplete) toggleClass(this.container, 'complete');
        // Append parent to container.
        tasksContainer.appendChild(this.container);
    }
}

class TaskCard extends TaskEl {
    constructor(task, color) {
        super(task, color);
        this.container.classList.add('task-card');
        // this.els.checkbox.addEventListener('click', this.toggleComplete),

        // Add click listener to display tasks details.
        this.els.name.el.addEventListener('click', () => new TaskDetails(task, this).display());
    }

    toggleComplete() {
        toggleClass(this.container, 'complete');
    }

    update(task) {
        this.els.name.el.textContent = task.name;
        // Need to fix this.
        this.els.dueDate.el.textContent = task.dueDate;
    }
}
// Listen for event from tasks.js and dom-projects.js
events.on('taskCreated', () => new TaskCard(task).display);

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
    constructor(task, card, color) {
        super(task, color);
        this.card = card;
        this.container.classList.add('task-details');

        // this.els.checkbox.addEventListener('click', this.toggleComplete),

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
            // When button is clicked, remove details div.
            el.addEventListener('click', () => tasksContainer.removeChild(this.container));
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
            el.addEventListener('click', () => tasksContainer.removeChild(this.container));
            // remove task card div,
            el.addEventListener('click', () => tasksContainer.removeChild(this.card.container));
            // and emit event to remove task from project.
            el.addEventListener('click', () => events.emit('taskDeleted', task));
            return {el};
        })();

        // Add edit button.
        this.els.editBtn = (() => {
            const el = createElement('button', 'Edit', 'details-edit');
            // When button is clicked, toggle delete btn display,
            el.addEventListener('click', () => toggleClass(this.els.deleteBtn.el, 'hidden'));
            // add edit button style/animation,
            // ----- code here -----
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
            // Allow priority circles to be changed.
            // this.els.priority.circles.forEach(circle => {
            //     circle.addEventListener('click', els.priority.styleCircles);
            // });
    
            this.els.name.el.contentEditable = true;
            // If placeholder text, get rid of it first,
            if (!task.desc) this.els.desc.el.textContent = '';
            // then make editable.
            this.els.desc.el.contentEditable = true;
        } else {
            console.log('Stopping edit mode...');
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

// // Refactoring displayTask to taskCard factory function.
// const taskCard = (task, color) => {
//     // Create parent task element and add class.
//     const card = createElement('div', '', 'task');

//     const els = (() => {
//         const checkbox = (() => {
//             const checkbox = document.createElement('input');
//             checkbox.setAttribute('type', 'checkbox');
//             // Add event listener to checkbox to toggle completion in tasks.js.
//             checkbox.addEventListener('click', () => events.emit('checkboxClicked', task));
//             // Add event listener to add style class when task is toggled complete.
//             checkbox.addEventListener('click', () => toggleClass(card, 'complete'));
//             // Style checkbox with proj color if displaying All Tasks.
//             if (color) {
//                 checkbox.style.boxShadow = '-1px 1px 5px ' + color;
//             }
//             return checkbox;
//         })();

//         const name = (() => {
//             const name = createElement('div', task.name, 'task-card-name');
//             // Add click listener to display tasks details.
//             name.addEventListener('click', () => taskDetails(task, card).display());
//             return name;
//         })();

//         const dueDate = (() => {
//             const dateTxt = task._dueDate ? task.dueDate : '';
//             const dueDate = createElement('div', dateTxt, 'task-card-date');
//             return dueDate;
//         })();

//         // const priority = (() => {

//         // })();
//         return {checkbox, name, dueDate}
//     })();

//     const display = () => {
//         // Loop through each child el and append to parent.
//         for (let el in els) {
//             const element = els[el];
//             card.appendChild(element);
//         }
//         // Check if task is complete and add complete styles if so.
//         if (task.isComplete) toggleClass(card, 'complete');
//         // Append parent to container.
//         tasksContainer.appendChild(card);
//     }

//     const update = () => {
//         els.name.textContent = task.name;
//         els.dueDate.textContent = task.dueDate;
//     }

//     return {display, update}
// }
// // Listen for event from tasks.js and dom-projects.js
// events.on('taskCreated', taskCard(task).display);

// // Wipe out all tasks when project is switched.
// function removeAllTasks() {
//     // While the container has a child, remove a child.
//     console.log('removing all tasks...');
//     while (tasksContainer.firstChild) {
//         tasksContainer.removeChild(tasksContainer.lastChild);
//     }
// }
// // Listen for event from dom-projects.js
// events.on('projectSwitched', removeAllTasks);

// // Display new project's tasks.
// function displayAllTasks(project) {
//     if (project.name === 'All Tasks') { // If Master Project
//         // Display each task from each project.
//         project.projects.forEach(childProject => {
//             childProject.tasks.forEach(task => taskCard(task, childProject.color).display());
//         });
//     }
//     // If normal project, and for unsorted masterProject tasks.
//     project.tasks.forEach(task => taskCard(task).display());
// }
// events.on('projectSwitched', displayAllTasks);


// // taskDetails as a factory function.
// const taskDetails = (task, taskCard) => {
//     const container = createElement('div', '', 'task-details');

//     let isEditable = false;

//     const toggleEditMode = () => {
//         isEditable = !isEditable;
//         // Toggle due date input whether or not in edit mode.
//         els.dueDate.toggleInput();

//         if (isEditable) {
//             console.log('Engaging edit mode...');
//             // Allow priority circles to be changed.
//             els.priority.circles.forEach(circle => {
//                 circle.addEventListener('click', els.priority.styleCircles);
//             });
    
//             els.name.contentEditable = true;
//             // If placeholder text, get rid of it first,
//             if (!task.desc) els.desc.textContent = '';
//             // then make editable.
//             els.desc.contentEditable = true;
//         } else {
//             console.log('Stopping edit mode...');
//             // Stop priority circles from being able to be changed.
//             els.priority.circles.forEach(circle => {
//                 circle.removeEventListener('click', els.priority.styleCircles);
//             });
//             els.name.contentEditable = false;
//             els.desc.contentEditable = false;
//             // Get data from user inputs.
//             // Set name from name element.
//             task.name = els.name.textContent;
//             // Set desc from desc element.
//             task.desc = els.desc.textContent;
//             // IF there was user input
//             if (els.dueDate.input.value) {
//                 // Set due date from the date input.
//                 task.dueDate = els.dueDate.input.value;
//             }   
//             // Get priority from circles.
//             // Loop through each circle.
//             task.priority = (() => {
//                 for (let i = 0; i < 3; i++) {
//                     const circle = els.priority.circles[i];
//                     // If a circle isn't filled,
//                     if (!circle.classList.contains('filled-circle')) {
//                         // Return the index of the circle
//                         // which is the that circle's priority minus 1.
//                         return i;
//                     }
//                 }
//                 // If all circles are filled, the priority is 3.
//                 return 3;
//             })();
//             // Emit taskUpdated event to update local storage.
//             events.emit('taskUpdated');
//             // Update taskCard with new info.
//             taskCard.update();
//         }
//     }

//     const els = (() => {
//         const priority = (() => {
//             const main = createElement('div', '', 'details-priority');

//             // Add label.
//             const priorityLabel = createElement('div', 'Priority:', 'priority-label');
//             main.appendChild(priorityLabel);

//             // Add circles.
//             const priorityNum = parseInt(task.priority);
//             // Empty array to store circles.
//             const circles = [];
//             // Create 3 circles.
//             for (let n = 1; n <= 3; n++) {
//                 const circle = createElement('div', '', 'priority-circle');
//                 // Add data attribute to identify the circle later.
//                 circle.dataset.num = n;
//                 // If circle number is <= priority number, fill it in.
//                 if (n <= priorityNum) {
//                     circle.classList.add('filled-circle');
//                 }
//                 // Push into array and append to element.
//                 circles.push(circle);
//                 main.appendChild(circle);
//             }

//             const styleCircles = (e) => {
//                 const newPriority = e.target.dataset.num;
//                 // Loop through each circle.
//                 for (let i = 0; i < circles.length; i++) {
//                     const circle = circles[i];
//                     // If circle should be filled for this new priority
//                     if ((circle.dataset.num <= newPriority && 
//                         // And is not yet filled
//                         !circle.classList.contains('filled-circle')) ||
//                         // OR if circle shouldn't be filled
//                         (circle.dataset.num  > newPriority &&
//                         // And is already filled
//                         circle.classList.contains('filled-circle'))) {
//                         // Toggle the filling.
//                         toggleClass(circle, 'filled-circle');
//                     } else { // Otherwise, don't change the style.
//                         continue;
//                     }
//                 }
//             }

//             return {main, circles, styleCircles} 
//         })();

//         const dueDate = (() => {
//             const main = createElement('div', '', 'details-date');

//             const dateTxt = task._dueDate ? task.dueDate : 'No Due Date';
//             const dateTxtEl = createElement('div', dateTxt);
//             main.appendChild(dateTxtEl);

//             // Fn to update date text.
//             const updateTxt = (e) => {
//                 console.log('input received.');
//                 const dateInput = e.target.value;
//                 const newDate = convertToDate(dateInput);
//                 const formattedDate = formatRelative(newDate, new Date(), { locale });
//                 dateTxtEl.textContent = formattedDate;
//             }

//             const input = createElement('input', '', 'hidden');
//             input.setAttribute('type', 'date');
//             // Add event listener to input to update dateTxt.
//             input.addEventListener('input', updateTxt);
//             main.appendChild(input);

//             // Fn to allow new input.
//             const toggleInput = () => {
//                 console.log('Toggling date input...');
//                 toggleClass(input, 'hidden');
//             }

//             return {main, input, toggleInput};
//         })();

//         const checkbox = (() => {
//             const checkbox = createElement('div', '', 'details-checkbox');
//             // Add event listener to checkbox to toggle completion in tasks.js.
//             checkbox.addEventListener('click', () => events.emit('checkboxClicked', task));
//             // Add event listener to add style class when task is toggled complete.
//             checkbox.addEventListener('click', () => toggleClass(taskCard, 'complete'));
//             // Style the task details name as well.
//             checkbox.addEventListener('click', () => toggleClass(name, 'complete'));
//             return checkbox;
//         })();

//         const name = (() => {
//             const name = createElement('h2', task.name, 'details-name');
//             // Check if task is complete and add complete styles if so.
//             if (task.isComplete) name.classList.add('complete');
//             return name;
//         })();

//         // Add task description.
//         const desc = (() => {
//             const descTxt = task.desc ? task.desc : 
//                 'Click the edit button to add details about your task...';
//             const desc = createElement('p', descTxt, 'details-desc');
//             return desc;
//         })();

//         // Add button to hide details.
//         const backBtn = (() => {
//             const backBtn = createElement('button', '<<', 'details-back');
//             // When button is clicked, remove details div.
//             backBtn.addEventListener('click', () => tasksContainer.removeChild(container));
//             return backBtn;
//         })();

//         // Add delete button.
//         const deleteBtn = (() => {
//             const deleteBtn = createElement('button', 'Delete');
//             // Set ID to ensure styles override other class.
//             deleteBtn.setAttribute('id', 'details-delete');
//             // Make init hidden.
//             deleteBtn.classList.add('hidden');
//             // When button is clicked, remove details div,
//             deleteBtn.addEventListener('click', () => tasksContainer.removeChild(container));
//             // remove task div,
//             deleteBtn.addEventListener('click', () => tasksContainer.removeChild(taskCard));
//             // and emit event to remove task from project.
//             deleteBtn.addEventListener('click', () => events.emit('taskDeleted', task));
//             return deleteBtn;
//         })();

//         // Add edit button.
//         const editBtn = (() => {
//             const editBtn = createElement('button', 'Edit', 'details-edit');
//             // When button is clicked, toggle delete btn display,
//             editBtn.addEventListener('click', () => toggleClass(deleteBtn, 'hidden'));
//             // add edit button style/animation,
//             // ----- code here -----
//             // and make elements editable.
//             editBtn.addEventListener('click', toggleEditMode);
//             return editBtn;
//         })();

//         return {priority, dueDate, checkbox, name, desc,
//                 backBtn, deleteBtn, editBtn}
//     })();

//     const display = () => {
//         // Loop through each child el and append to parent.
//         for (let el in els) {
//             const element = els[el];
//             if (element === els.priority | element === els.dueDate) { // If els that are objs.
//                 container.appendChild(element.main);
//             } else {
//                 container.appendChild(element);
//             }
//         }
//         // Append parent to container.
//         tasksContainer.appendChild(container);
//     }

//     return {display}
// }
export {TaskCard}
//export {taskCard};