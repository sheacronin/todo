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

// Temp test tasks.
const cleanRoom = new Task('Clean room', 'I need to clean my room', 'tomorrow', 2);
const editColors = new Task('Edit Colors', 'Change the color to blue', '3 days', 1);

// Fn to create a new task and emit an event.
function createTask(args) {
    const task = new Task(...args);
    // Push new task into active project.
    // ...Code here...
    events.emit('taskCreated', task);
}

// When task-form.js submits form:
events.on('taskFormSubmitted', createTask);
// When user clicks checkbox, toggle task complete.
events.on('checkboxClicked', (task) => task.toggleComplete());

export {cleanRoom, editColors, Task};