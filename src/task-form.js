import {events} from './events';

// Make form an object?
const taskForm = {
    // Set form element and visibility as props.
    formEl: document.querySelector('.task-form'),
    isHidden: true,
    // Set form inputs as inner obj properties.
    inputs: {
        title: document.querySelector('#title'),
        desc: document.querySelector('#description'),
        dueDate: document.querySelector('#due-date'),
        priority: document.querySelector('#priority')
    },
    // Form submit button.
    submitBtn: document.querySelector('#submit-form-btn'),
    // Button to display form.
    displayBtn: document.querySelector('#display-form-btn'),
    // Method to toggle display.
    toggleDisplay() {
        if (this.isHidden) {
            this.formEl.classList.remove('hidden');
        } else {
            this.formEl.classList.add('hidden');
        }
        // Update isHidden boolean to reflect change.
        this.isHidden = !this.isHidden;
    },
    submit() {
        // Create empty args array.
        const inputValues = [];
        // Loop through inputs properties.
        for (let key in this.inputs) {
            // Store each input value in the args array.
            inputValues.push(this.inputs[key].value)
        }
        // Emit event with array of input values.
        events.emit('formSubmitted', inputValues);
    }
}

taskForm.displayBtn.addEventListener('click', () => taskForm.toggleDisplay());
taskForm.submitBtn.addEventListener('click', () => taskForm.submit());
taskForm.submitBtn.addEventListener('click', () => taskForm.toggleDisplay());

export {taskForm};