import {events} from './events';
import {cleanRoom, editColors} from './tasks';

class Project {
    constructor(name, color, tasks) {
        this.name = name;
        this.color = color;
        // Project.tasks stores an array with task objs.
        this.tasks = tasks;
    }
}

// Create default project obj to store all tasks.
const defaultProject = new Project('All Tasks', '#779cab', [cleanRoom]);

// Store all projects in an array.
const allProjects = [defaultProject];

// // Local storage stuff:
// // Function to update projects in local storage.
// function updateLocalStorage() {
//     localStorage.setItem('allprojects', JSON.stringify(allProjects)); // Convert array & objects to string.
// }
// // Check if projects exist in local storage.
// // !! Move this to index.js?
// if (localStorage.getItem('allprojects')) {
//     // Update page with user's projects
//     const storedProjects = JSON.parse(localStorage.getItem('allprojects')); // Parse to un-stringify array.
//     storedProjects.forEach(project => {
//         // Reconstruct project objects.
//         project = new Project(project.name, project.color);
//         allProjects.push(project);
//     });
// }

// Fn to create a new project and emit an event.
function createProject(args) {
    const project = new Project(...args);
    // Add new project to all projects array.
    allProjects.push(project);
    // Emit event so dom-projects.js displays project.
    events.emit('projectCreated', project);
    console.log(allProjects);

    // updateLocalStorage();
}

// When form.js submits projects form:
events.on('projectFormSubmitted', createProject);

// Add another test project.
createProject(['Todo App', '#FFE66D', [editColors]]);

export {defaultProject};
export {allProjects};