import {events} from './events';
import {masterProject} from './projects';
import {toggleClass} from './helpers';

class Form {
    constructor(type) {
        this.type = type,
        // Store the form element as a property.
        this.el = document.querySelector(`#${type}-form`),
        // Store an array of form's inputs, including textarea.
        this.inputs = Array.from(document.querySelectorAll(`#${type}-form input, #${type}-form textarea`)),
        this.submitBtn = document.querySelector(`#submit-${type}-btn`),
        this.displayBtn = document.querySelector(`#disp-${type}-form-btn`)
    }
    isNameNotEmpty() { // Checks if name input is empty.
        const name = this.el.elements[`${this.type}-name`].value;
        if (!name.match(/\S/)) { // If has no value besides space.
            alert (`You must enter a ${this.type} name.`);
            return false;
        } else {
            return true;
        } 
    }
    submit() {
        // Create an array with the input values.
        const inputValues = this.inputs.map(input => input.value);
        // Emit event w/ args for new obj creation.
        events.emit(`${this.type}FormSubmitted`, inputValues);
    }
}

// Create objects of both forms.
const taskForm = new Form('task');
const projectForm = new Form ('project');
projectForm.isNameValid = function() {
    const name = this.el.elements[`${this.type}-name`].value;
    if (name === 'All Tasks') {
        alert('You cannot name a project "All Tasks".');
        return false;
    } else {
        return true;
    }
}

// Store both forms in an array.
const forms = [taskForm, projectForm];

// Switches the two form display buttons.
function switchActiveForm() {
    forms.forEach(form => {
        toggleClass(form.displayBtn, 'hidden');
    });
}
// Function runs when dom-projects emits event that projects list is active.
events.on('projectsToggled', switchActiveForm);

// Add event listeners to each form's buttons.
forms.forEach(form => {
    // Toggle if form is hidden when display/submit button is clicked.
    form.displayBtn.addEventListener('click', () => toggleClass(form.el, 'hidden'));
    // Run submit method when submit button is clicked.
    form.submitBtn.addEventListener('click', () => {
        // Check if form is valid first.
        if ((form.type === 'project' && form.isNameValid()) || form.type === 'task') {
            if (form.isNameNotEmpty()) {
                // Form is valid, so run submit.
                form.submit();
                // Hide form after submission.
                toggleClass(form.el, 'hidden');
                // Return to stop rest of function.
                return;
            }
        }
        // If the checks return false.
        console.log('Form could not be submitted.');
    });
});

const projectSelect = {
    el: document.querySelector('#project-select'),
    // Populate project select element.
    addOption(project) {
        const option = document.createElement('option');
        option.textContent = project.name;
        option.setAttribute('value', project.name);
        this.el.appendChild(option);
    },
    switchSelected(project) {
        // Loop through each option.
        for (let i = 0; i < this.el.children.length; i++) {
            let option = this.el.children[i];
            if (option.value === project.name) { // If option matches current project.
                // Select option.
                option.selected = true;
                // Return to stop looping.
                return;
            }
        }
    },
    getSelected() {
        console.log(this.el.value);
        // If master project is selected, return master project obj.
        if (this.el.value === 'All Tasks') return masterProject;
        // If not master project, fn continues to loop thru each project
        // looking for a match.
        for (let i = 0; i < masterProject.projects.length; i++) {
            let project = masterProject.projects[i];
            console.log(project.name + '===' + this.el.value);
            if (this.el.value === project.name) {
                console.log('found a match.')
                return project;
            }
        }
    }
}
// Bind to projectSelect so 'this' has correct value.
// Listen for each time project is created to add to selection element.
events.on('projectCreated', projectSelect.addOption.bind(projectSelect));
// Listen for each time project is switched to switch selected project.
events.on('projectSwitched', projectSelect.switchSelected.bind(projectSelect));

export {taskForm, projectSelect};