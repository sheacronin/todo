// Task form - make its own module??
function showTaskForm() {
    const taskForm = document.querySelector('.task-form');
    taskForm.classList.remove('hidden');
}

// Button to add new task.
const showFormBtn = document.querySelector('#show-form-btn');
showFormBtn.addEventListener('click', showTaskForm);

// Form task creation.
const taskForm = document.querySelector('.task-form');

function createNewTaskWithForm() {
    const nameInput = document.querySelector('#name');
    const descInput = document.querySelector('#description');
    const dueDateInput = document.querySelector('#due-date');
    const priorityInput = document.querySelector('#priority-input');

    return new Task(nameInput, descInput, dueDateInput, priorityInput);
}

const submitFormBtn = document.querySelector('#submit-form-btn');