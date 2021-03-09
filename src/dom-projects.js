import {defaultProject} from './projects';
import {toggleClass} from './index';
import { events } from './events';

// Store header in variable.
const header = document.querySelector('header');
// Set header to display project name.
header.textContent = defaultProject.name;

// Root variable to access CSS variable for proj color.
const root = document.documentElement;
// Set header & footer styles to use project color.
root.style.setProperty('--proj-color', defaultProject.color);

// Store projects list el in variable.
const projectsList = document.querySelector('#projects-list');

// Add stored projects to list.
// Code here...

// Store button to toggle projects list display.
const switchProjBtn = document.querySelector('#switch-proj');
// Add event listener to button to show projects list.
switchProjBtn.addEventListener('click', () => toggleClass(projectsList, 'hidden'));
// Emit event to tell forms that projects list is active/no longer active.
switchProjBtn.addEventListener('click', () => events.emit('projectsToggled'));

export {header};