import {events} from './events';
import {locale, convertToDate} from './helpers';
import {formatRelative} from 'date-fns';

class Task {
    constructor(name, desc, dueDate, priority, isComplete) {
        this.name = name;
        this.desc = desc;
        this._dueDate = dueDate;
        this.priority = priority;
        this.isComplete = isComplete || false;
    }
    toggleComplete() {
        this.isComplete = !this.isComplete;
        events.emit('taskUpdated');
    }
    get dueDate() {
        // Store due date in Date object.
        const date = convertToDate(this._dueDate);
        // Return due date relative to current date.
        return formatRelative(date, new Date(), { locale });
    }
    set dueDate(input) {
        // -- Could convert to date here instead of in getter.
        this._dueDate = input;
    }
}

// Fn to create a new task and emit an event.
function createTask(args) {
    const task = new Task(...args);
    console.log(`created task ${task.name}`);
    console.log(task.dueDate);
    events.emit('taskCreated', task);
}

// When task-form.js submits form:
events.on('taskFormSubmitted', createTask);
// When user clicks checkbox, toggle task complete.
events.on('checkboxClicked', (task) => task.toggleComplete());

export {Task, createTask};