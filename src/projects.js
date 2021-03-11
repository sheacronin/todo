import {events} from './events';
import {cleanRoom, editColors} from './tasks';
import {updateLocalStorage} from './index';

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

// // Create default project obj to store all tasks.
// const defaultProject = new Project('All Tasks', '#779cab', [cleanRoom]);

// Store all projects in an array.
const allProjects = [];

// Variable to store project user displays.
let activeProject = allProjects[0];
// Fn to switch active project.
function assignActiveProject(project) {
    console.log('assigning active project...')
    activeProject = project;
}
// Change active project when dom-projects emits event.
events.on('projectSwitched', assignActiveProject);
// Event listener to add new tasks to active project.
events.on('taskCreated', (task) => activeProject.addTask(task));

// Fn to create a new project and emit an event.
function createProject(args) {
    const project = new Project(...args);
    // Add new project to all projects array.
    allProjects.push(project);
    // Emit event so dom-projects.js displays project.
    events.emit('projectCreated', project);

    updateLocalStorage();
}

// When form.js submits projects form:
events.on('projectFormSubmitted', createProject);

export {Project, createProject, allProjects};