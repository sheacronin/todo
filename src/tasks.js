import {events} from './events';
import { formatRelative, subDays, addDays, format } from 'date-fns';
import enUS from 'date-fns/locale/en-GB';

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
        // Create custom relative formatting.
        const formatRelativeLocale = {
            lastWeek: "'Last' eeee",
            yesterday: "'Yesterday'",
            today: "'Today'",
            tomorrow: "'Tomorrow'",
            nextWeek: "eeee",
            other: 'MMM do', // Formatted like 'Mar 26th'.
        };
        // Store custom formatting in locale object.
        const locale = {
            ...enUS,
            formatRelative: (token) => formatRelativeLocale[token],
        }
        // Store due date in Date object.
        const date = new Date(this._dueDate + ' 00:00');
        // Return due date relative to current date.
        return formatRelative(date, new Date(), { locale });
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