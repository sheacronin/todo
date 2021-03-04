import {Task} from './tasks';

// Make form an object?
const taskForm = {
    // Set form element and visibility as props.
    formEl: document.querySelector('.task-form'),
    isHidden: true,
    // Set form inputs as properties.
    titleInput: document.querySelector('#title'),
    descInput: document.querySelector('#description'),
    dueDateInput: document.querySelector('#due-date'),
    priorityInput: document.querySelector('#priority'),
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
    // Method to create new task obj.
    // Should this go in tasks module instead? / emit event instead
    createNewTask() {
        const task = new Task(this.titleInput.value, this.descInput.value,
                             this.dueDateInput.value, this.priorityInput.value);
        console.log(task);
        return task;
    }
}

taskForm.displayBtn.addEventListener('click', () => taskForm.toggleDisplay());
taskForm.submitBtn.addEventListener('click', () => taskForm.createNewTask());

export {taskForm};