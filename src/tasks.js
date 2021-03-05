import {events} from './events';

class Task {
    constructor(title, desc, dueDate, priority) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = false;
    }
    toggleComplete() {
        this.isComplete = !this.isComplete;
    }
}

const cleanRoom = new Task('Clean room', 'I need to clean my room', 'tomorrow', 2);

// Fn to create a new task and emit an event.
function createTask(args) {
    const task = new Task(...args);
    events.emit('taskCreated', task);
}

// When task-form.js submits form:
events.on('formSubmitted', createTask);
// When user clicks checkbox, toggle task complete.
events.on('checkboxClicked', (task) => task.toggleComplete());

export {cleanRoom, Task};