import {events} from './events';
import {toggleClass} from './index';

class Form {
    constructor(type) {
        this.type = type;
        // Store the form element as a property.
        this.element = document.querySelector(`#${type}-form`),
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

const taskForm = new Form('task');

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

// Toggle if form is hidden when display/submit button is clicked.
taskForm.displayBtn.addEventListener('click', () => toggleClass(taskForm.element, 'hidden'));
taskForm.submitBtn.addEventListener('click', () => toggleClass(taskForm.element, 'hidden'));
// Run submit method when submit button is clicked.
taskForm.submitBtn.addEventListener('click', () => taskForm.submit());

export {taskForm};