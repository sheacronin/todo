import {events} from './events';
import {masterProject} from './index';
import {projectSelect} from './forms';

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
        console.log(masterProject);
        events.emit('projectUpdated');
    }
    // Fn to run when task is deleted.
    removeTask(task) {
        const i = this.tasks.indexOf(task);
        console.log('Removing ' + this.tasks[i].name + ' from ' + this.name);
        this.tasks.splice(i, 1);
        events.emit('projectUpdated');
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
events.on('taskCreated', (task) => {
    // Store the selected project.
    const selectedProject = projectSelect.getSelected.bind(projectSelect)();
    console.log(selectedProject);
    selectedProject.addTask(task);
});

// Event listener to remove deleted tasks from active project.
events.on('taskDeleted', (task) => {
    if (activeProject === masterProject) {
        // If the task doesn't belong to the master project.
        if (!masterProject.tasks.includes(task)) {
            // Loop through all the other projects
            // to find which project needs to remove the task.
            for (let i = 0; i < masterProject.projects.length; i++) {
                const project = masterProject.projects[i];
                // Run method to remove task once it is found in project.
                if (project.tasks.includes(task)) project.removeTask(task);
                return;
            }
        }
    }
    // Remove task from active project once it is determined it must be
    // the owner of the task.
    activeProject.removeTask(task)
});

// Fn to create a new project and emit an event.
function createProject(args) {
    console.log(`Creating project ${args[0]}...`);
    const project = new Project(...args);
    if (project.name === 'All Tasks') { // If Master Project
        // Create an array property to store other projects.
        project.projects = [];
    } else { // If an other project
        // Add new project to all projects array.
        masterProject.projects.push(project);
    }
    // Emit event so dom-projects.js displays project.
    events.emit('projectCreated', project);

    return project;
}

// When form.js submits projects form:
events.on('projectFormSubmitted', createProject);

export {Project, createProject};