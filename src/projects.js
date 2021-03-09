import {events} from './events';

class Project {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        // Project.tasks stores an array with task objs.
        this.tasks = [];
    }
}

const defaultProject = new Project('default', 'green');

// Store all projects in an array.
const allProjects = [defaultProject];

// Fn to create a new project and emit an event.
function createProject(args) {
    const project = new Project(...args);
    events.emit('projectCreated', project);
}

// When form.js submits projects form:
events.on('projectFormSubmitted', createProject);

export {defaultProject};