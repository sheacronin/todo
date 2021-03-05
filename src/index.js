import {Task, cleanRoom} from './tasks';
import {displayTask} from './dom-tasks';
import {taskForm} from './task-form';
import {defaultProject} from './projects';
import {header} from './dom-projects';

// Store all projects in an array.
const allProjects = [defaultProject];

displayTask(cleanRoom);