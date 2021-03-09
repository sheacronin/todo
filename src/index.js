import {Task, cleanRoom} from './tasks';
import {displayTask} from './dom-tasks';
import {taskForm} from './forms';
import {defaultProject} from './projects';
import {header} from './dom-projects';

// Helper fn.
function toggleClass(el, cls) {
    // Decide if complete class needs to be removed or added.
    const action = el.classList.contains(cls) ? 'remove' : 'add';
    // Remove/add the class.
    el.classList[action](cls);
}

displayTask(cleanRoom);

export {toggleClass};