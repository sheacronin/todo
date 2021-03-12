import {events} from './events';
import {cleanRoom, editColors} from './tasks';
import {updateLocalStorage, masterProject} from './index';

class Project {
    constructor(name, color, tasks) {
        this.name = name;
        this.color = color;
        // Project.tasks stores an array with task objs.
        this.tasks = tasks || [];
    }
    // Fn to run when a new task is created.
    addTask(task) {
        this.tasks.push(task);
    }
}

// Variable to store project user displays.
let activeProject;
// Fn to switch active project.
function assignActiveProject(project) {
    console.log(`assigning ${project.name} as active project...`);
    activeProject = project;
}
// Change active project when dom-projects emits event.
events.on('projectSwitched', assignActiveProject);
// Event listener to add new tasks to active project.
events.on('taskCreated', (task) => activeProject.addTask(task));

// Fn to create a new project and emit an event.
function createProject(args) {
    console.log(`Creating project ${args[0]}...`);
    const project = new Project(...args);
    if (project.name !== 'All Tasks') { // If not Master Project
        // Add new project to all projects array.
        masterProject.tasks.push(project);
    }
    // Emit event so dom-projects.js displays project.
    events.emit('projectCreated', project);

    updateLocalStorage();
    return project;
}

// When form.js submits projects form:
events.on('projectFormSubmitted', createProject);

export {Project, createProject};