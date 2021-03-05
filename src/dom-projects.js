import {defaultProject} from './projects';

// Store header & footer in variables.
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Root variable to access CSS variable for proj color.
const root = document.documentElement;
// Set header to display project name.
header.textContent = defaultProject.name;
// Set header & footer styles to use project color.
root.style.setProperty('--proj-color', defaultProject.color);

export {header};