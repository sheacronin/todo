class Project {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        // Project.tasks stores an array with task objs.
        this.tasks = [];
    }
}

const defaultProject = new Project('default', 'green');

// Store all projects in an array.
const allProjects = [defaultProject];

export {defaultProject};