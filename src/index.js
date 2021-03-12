import {Task, createTask} from './tasks';
import {displayTask, displayAllTasks} from './dom-tasks';
import {taskForm} from './forms';
import {addProjectToList} from './dom-projects';
import {Project, createProject} from './projects';
import { events } from './events';

// Helper fn.
function toggleClass(el, cls) {
    // Decide if complete class needs to be removed or added.
    const action = el.classList.contains(cls) ? 'remove' : 'add';
    // Remove/add the class.
    el.classList[action](cls);
}

// Create default project obj to store all tasks.
// This project's "tasks" array will store every other project obj.
const masterProject = createProject(['All Tasks', '#779cab']);
console.log(masterProject.tasks);

// Local storage stuff:
// Function to update projects in local storage.
function updateLocalStorage() {
    console.log('Local storage updating...');
    localStorage.setItem('allprojects', JSON.stringify(masterProject.tasks)); // Convert array & objects to string.
}
// Event listeners for when to update local storage.
events.on('projectCreated', updateLocalStorage);
events.on('projectUpdated', updateLocalStorage);
events.on('taskUpdated', updateLocalStorage);
// Check if projects exist in local storage.
if (localStorage.getItem('allprojects')) {
    // Update page with user's projects
    const storedProjects = JSON.parse(localStorage.getItem('allprojects')); // Parse to un-stringify array.
    storedProjects.forEach(project => {
        // Reconstruct project objects.
        project = new Project(project.name, project.color, project.tasks);
        masterProject.tasks.push(project);
    });
}

// Display all projects in list on page load.
masterProject.tasks.forEach(project => addProjectToList(project));
// Switch to master project on page load.
events.emit('projectSwitched', masterProject);

export {toggleClass, masterProject, updateLocalStorage};