import {Task, createTask} from './tasks';
import {displayAllTasks} from './dom-tasks';
import {taskForm, projectSelect} from './forms';
import {addProjectToList, switchProject} from './dom-projects';
import {Project, createProject, masterProject} from './projects';
import {events} from './events';

// Local storage stuff:
// Function to update projects in local storage.
function updateLocalStorage() {
    console.log('Local storage updating...');
    localStorage.setItem('masterproject', JSON.stringify(masterProject)); // Convert array & objects to string.
}
// Event listeners for when to update local storage.
events.on('projectCreated', updateLocalStorage);
events.on('projectUpdated', updateLocalStorage);
events.on('taskUpdated', updateLocalStorage);
// Check if projects exist in local storage.
if (localStorage.getItem('masterproject')) {
    const storedMasterProject = JSON.parse(localStorage.getItem('masterproject')); // Parse to un-stringify array.
    // Add stored unsorted tasks to Master Project.
    storedMasterProject.tasks.forEach(task => {
        task = new Task(task.name, task.desc, task._dueDate, task.priority, task.isComplete);
        masterProject.tasks.push(task);
    })
    // Update page with user's projects
    storedMasterProject.projects.forEach(project => {
        // Reconstruct task objects into new array.
        const tasks = project.tasks.map(
            task => new Task(task.name, task.desc, task._dueDate, task.priority, task.isComplete)
        );
        // Reconstruct project objects.
        project = new Project(project.name, project.color, tasks);
        // Add project options to task form.
        projectSelect.addOption(project);
        // Store in masterProject object.
        masterProject.projects.push(project);
    });
}

// Display all projects in list on page load, including master project.
addProjectToList(masterProject);
masterProject.projects.forEach(project => addProjectToList(project));
// Switch to master project on page load.
switchProject(masterProject);

export {updateLocalStorage};