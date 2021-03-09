import {events} from './events';
import {toggleClass} from './index';

class Form {
    constructor(type) {
        this.type = type,
        // Store the form element as a property.
        this.el = document.querySelector(`#${type}-form`),
        // Store an array of form's inputs, including textarea.
        this.inputs = Array.from(document.querySelectorAll(`#${type}-form input, textarea`)),
        this.submitBtn = document.querySelector(`#submit-${type}-btn`),
        this.displayBtn = document.querySelector(`#disp-${type}-form-btn`)
    }
    submit() {
        // Create an array with the input values.
        const inputValues = this.inputs.map(input => input.value);
        events.emit(`${this.type}FormSubmitted`, inputValues);
    }
}

// Old code of object's inputs:
//     // Set form inputs as inner obj properties.
//     inputs: {
//         name: document.querySelector('#task-name'),
//         desc: document.querySelector('#description'),
//         dueDate: document.querySelector('#due-date'),
//         priority: document.querySelector('#priority')
//     },
//     submit() {
//         // Create empty args array.
//         const inputValues = [];
//         // Loop through inputs properties.
//         for (let key in this.inputs) {
//             // Store each input value in the args array.
//             inputValues.push(this.inputs[key].value)
//         }
//         // Emit event with array of input values.
//         events.emit('formSubmitted', inputValues);
//     }

// Create objects of both forms.
const taskForm = new Form('task');
const projectForm = new Form ('project');
// Store both forms in an array.
const forms = [taskForm, projectForm];

// Switches the two form display buttons.
function switchActiveForm() {
    forms.forEach(form => {
        toggleClass(form.displayBtn, 'hidden');
    });
}
// Function runs when dom-projects emits event that projects list is active.
events.on('projectsToggled', switchActiveForm);

// Add event listeners to each form's buttons.
forms.forEach(form => {
    // Toggle if form is hidden when display/submit button is clicked.
    form.displayBtn.addEventListener('click', () => toggleClass(form.el, 'hidden'));
    form.submitBtn.addEventListener('click', () => toggleClass(form.el, 'hidden'));
    // Run submit method when submit button is clicked.
    form.submitBtn.addEventListener('click', () => form.submit());
});

export {taskForm};
export {Form};