import {toggleClass, createElement} from './helpers';
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
    // Emit event for dom-tasks to remove all current tasks,
    // then display the new project's tasks.
    events.emit('projectSwitched', project);
}
// After a project is created, switch to that project.
events.on('projectCreated', switchProject);

// Store projects list el in variable.
const projectsList = document.querySelector('#projects-list');

// Add stored projects to list.
function addProjectToList(project) {
    console.log(`Adding ${project.name} to list...`);
    // Create project element and add class.
    const container = createElement('div', '', 'project');
    container.style.backgroundColor = project.color + '80';

    // Add delete button, as long as not Master Project.
    if (project.name !== 'All Tasks') {
        const deleteBtn = createElement('button', 'Delete', 'project-delete');
        deleteBtn.addEventListener('click', () => removeProjectFromList(container, project));
        container.appendChild(deleteBtn);
    }

    const name = createElement('div', project.name, 'project-name');
    // Add event listener to switch project styles & tasks.
    name.addEventListener('click', () => switchProject(project));
    // Anoter event listener to hide projects list after a project is clicked.
    name.addEventListener('click', toggleProjectsList);
    container.appendChild(name);

    // Append project element to container.
    projectsList.appendChild(container);
}
// Listen for event from projects.js
events.on('projectCreated', addProjectToList);

function removeProjectFromList(el, project) {
    console.log(`Removing ${project.name}...`);
    if (window.confirm(`All tasks will be deleted that belong to this project.
    Are you sure you want to delete your ${project.name} project?`)) {
        projectsList.removeChild(el);
        events.emit('projectRemoved', project);
    } else {
        console.log(`No longer removing ${project.name}!`);
    }
}

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

export {addProjectToList, switchProject};