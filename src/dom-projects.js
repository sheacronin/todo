import {defaultProject} from './projects';
import {toggleClass} from './index';
import {events} from './events';

function updateStyles(project) {
    // Store header in variable.
    const header = document.querySelector('header');
    // Set header to display project name.
    header.textContent = project.name;

    // Root variable to access CSS variable for proj color.
    const root = document.documentElement;
    // Set header & footer styles to use project color.
    root.style.setProperty('--proj-color', project.color);
}

// Function to update styles and emit events to update tasks.
function switchProject(project) {
    updateStyles(project);
    // Emit event for dom-tasks to remove all current tasks.
    events.emit('projectSwitched', project);
    // Emit events for dom-tasks to add each task.
    if (project.tasks) {
        project.tasks.forEach(task => {
            events.emit('taskCreated', task);
        });
    }
}
// After a project is created, switch to that project.
events.on('projectCreated', switchProject);

// Store projects list el in variable.
const projectsList = document.querySelector('#projects-list');

// Add stored projects to list.
function addProjectToList(project) {
    // Create project element and add class.
    const el = document.createElement('div');
    el.classList.add('project');
    el.style.backgroundColor = project.color + '80';
    el.textContent = project.name;
    
    // Add event listener to switch project styles & tasks.
    el.addEventListener('click', () => switchProject(project));
    // Anoter event listener to hide projects list after a project is clicked.
    el.addEventListener('click', toggleProjectsList);

    // Append project element to container.
    projectsList.appendChild(el);
}
// Listen for event from projects.js
events.on('projectCreated', addProjectToList);

function toggleProjectsList() {
    // Toggle visibility.
    toggleClass(projectsList, 'hidden');
    // Emit event to tell forms that projects list is active/no longer active.
    events.emit('projectsToggled');
}

// Store button to toggle projects list display.
const switchProjBtn = document.querySelector('#switch-proj');
// Add event listener to button to show projects list.
switchProjBtn.addEventListener('click', toggleProjectsList);

export {addProjectToList};