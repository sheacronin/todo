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

// Store projects list el in variable.
const projectsList = document.querySelector('#projects-list');

// Fn to switch active project.
function updateTasks(project) {
    console.log('Switching project...');
    // Emit event for dom-tasks to remove all current tasks.
    events.emit('projectSwitched');
    // Emit events for dom-tasks to add each task.
    project.tasks.forEach(task => {
        events.emit('taskCreated', task);
    });
}

// Add stored projects to list.
function displayProject(project) {
    // Create project element and add class.
    const el = document.createElement('div');
    el.classList.add('project');
    el.style.backgroundColor = project.color + '80';
    el.textContent = project.name;
    
    // Add event listener to switch project styles & tasks.
    el.addEventListener('click', () => updateStyles(project));
    el.addEventListener('click', () => updateTasks(project));
    // Anoter event listener to hide projects list after a project is clicked.
    el.addEventListener('click', () => toggleClass(projectsList, 'hidden'));

    // Append project element to container.
    projectsList.appendChild(el);
}
// Listen for event from projects.js
events.on('projectCreated', displayProject);

// Store button to toggle projects list display.
const switchProjBtn = document.querySelector('#switch-proj');
// Add event listener to button to show projects list.
switchProjBtn.addEventListener('click', () => toggleClass(projectsList, 'hidden'));
// Emit event to tell forms that projects list is active/no longer active.
switchProjBtn.addEventListener('click', () => events.emit('projectsToggled'));

export {displayProject};