import {events} from './events';

class Task {
    constructor(name, desc, dueDate, priority) {
        this.name = name;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = false;
    }
    toggleComplete() {
        this.isComplete = !this.isComplete;
    }
}

// Fn to create a new task and emit an event.
function createTask(args) {
    const task = new Task(...args);
    console.log(`created task ${task.name}`);
    // Push new task into active project.
    // ...Code here...
    events.emit('taskCreated', task);
}

// When task-form.js submits form:
events.on('taskFormSubmitted', createTask);
// When user clicks checkbox, toggle task complete.
events.on('checkboxClicked', (task) => task.toggleComplete());

export {Task, createTask};