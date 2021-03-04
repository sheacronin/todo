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

function createTask(args) {
    const task = new Task(...args);
    console.log(task);
}

events.on('formSubmitted', createTask);

export {cleanRoom, Task};