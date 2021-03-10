import {Task, cleanRoom} from './tasks';
import {displayTask} from './dom-tasks';
import {taskForm} from './forms';
import {allProjects, defaultProject} from './projects';
import {displayProject} from './dom-projects';

// Helper fn.
function toggleClass(el, cls) {
    // Decide if complete class needs to be removed or added.
    const action = el.classList.contains(cls) ? 'remove' : 'add';
    // Remove/add the class.
    el.classList[action](cls);
}

console.log(defaultProject);

// Display all projects on page load.
allProjects.forEach(project => displayProject(project));
// Display all tasks in current project on page load.
defaultProject.tasks.forEach(task => displayTask(task));

export {toggleClass};