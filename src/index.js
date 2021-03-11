import {Task, createTask} from './tasks';
import {displayTask} from './dom-tasks';
import {taskForm} from './forms';
import {Project, createProject, allProjects} from './projects';
import {addProjectToList} from './dom-projects';

// Helper fn.
function toggleClass(el, cls) {
    // Decide if complete class needs to be removed or added.
    const action = el.classList.contains(cls) ? 'remove' : 'add';
    // Remove/add the class.
    el.classList[action](cls);
}

// Local storage stuff:
// Function to update projects in local storage.
function updateLocalStorage() {
    console.log('would update local storage.')
    // localStorage.setItem('allprojects', JSON.stringify(allProjects)); // Convert array & objects to string.
}
// // Check if projects exist in local storage.
// if (localStorage.getItem('allprojects')) {
//     // Update page with user's projects
//     const storedProjects = JSON.parse(localStorage.getItem('allprojects')); // Parse to un-stringify array.
//     storedProjects.forEach(project => {
//         // Reconstruct project objects.
//         project = new Project(project.name, project.color);
//         allProjects.push(project);
//     });
// }

console.log(allProjects)

// Display all projects on page load.
allProjects.forEach(project => addProjectToList(project));
// Display all tasks in current project on page load.
// defaultProject.tasks.forEach(task => displayTask(task));






// Temp test projects.
createProject(['Chores', '#009946']);
createProject(['To Do App', '#983454']);

// Temp test tasks.
createTask(['Clean room', 'I need to clean my room', 'tomorrow', 2]);
createTask(['Edit Colors', 'Change the color to blue', '3 days', 1]);

export {toggleClass, updateLocalStorage};