/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom-projects.js":
/*!*****************************!*\
  !*** ./src/dom-projects.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addProjectToList\": () => (/* binding */ addProjectToList)\n/* harmony export */ });\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n\n\n\n\nfunction updateStyles(project) {\n    // Store header in variable.\n    const header = document.querySelector('header');\n    // Set header to display project name.\n    header.textContent = project.name;\n\n    // Root variable to access CSS variable for proj color.\n    const root = document.documentElement;\n    // Set header & footer styles to use project color.\n    root.style.setProperty('--proj-color', project.color);\n}\n\n// Function to update styles and emit events to update tasks.\nfunction switchProject(project) {\n    updateStyles(project);\n    // Emit event for dom-tasks to remove all current tasks,\n    // then display the new project's tasks.\n    _events__WEBPACK_IMPORTED_MODULE_2__.events.emit('projectSwitched', project);\n}\n// After a project is created, switch to that project.\n_events__WEBPACK_IMPORTED_MODULE_2__.events.on('projectCreated', switchProject);\n\n// Store projects list el in variable.\nconst projectsList = document.querySelector('#projects-list');\n\n// Add stored projects to list.\nfunction addProjectToList(project) {\n    console.log(`Adding ${project.name} to list...`);\n    // Create project element and add class.\n    const el = document.createElement('div');\n    el.classList.add('project');\n    el.style.backgroundColor = project.color + '80';\n    el.textContent = project.name;\n    \n    // Add event listener to switch project styles & tasks.\n    el.addEventListener('click', () => switchProject(project));\n    // Anoter event listener to hide projects list after a project is clicked.\n    el.addEventListener('click', toggleProjectsList);\n\n    // Append project element to container.\n    projectsList.appendChild(el);\n}\n// Listen for event from projects.js\n_events__WEBPACK_IMPORTED_MODULE_2__.events.on('projectCreated', addProjectToList);\n\nfunction toggleProjectsList() {\n    // Toggle visibility.\n    (0,_index__WEBPACK_IMPORTED_MODULE_1__.toggleClass)(projectsList, 'hidden');\n    // Emit event to tell forms that projects list is active/no longer active.\n    _events__WEBPACK_IMPORTED_MODULE_2__.events.emit('projectsToggled');\n}\n\n// Store button to toggle projects list display.\nconst switchProjBtn = document.querySelector('#switch-proj');\n// Add event listener to button to show projects list.\nswitchProjBtn.addEventListener('click', toggleProjectsList);\n\n\n\n//# sourceURL=webpack://todo/./src/dom-projects.js?");

/***/ }),

/***/ "./src/dom-tasks.js":
/*!**************************!*\
  !*** ./src/dom-tasks.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displayTask\": () => (/* binding */ displayTask)\n/* harmony export */ });\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n// Module purpose: Manage tasks in the DOM.\n\n\n\n// Store tasks container div in a vairable.\nconst tasksContainer = document.querySelector('#tasks-container');\n\n// Fn to add a new task to the DOM.\nfunction displayTask(task, color) {\n    console.log(`displaying task ${task.name}`);\n    // Create task element and add class.\n    const taskEl = document.createElement('div');\n    taskEl.classList.add('task');\n\n    // Create and append checkbox to div element.\n    const checkbox = document.createElement('input');\n    checkbox.setAttribute('type', 'checkbox');\n    // Add event listener to checkbox to toggle completion in tasks.js.\n    checkbox.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.emit('checkboxClicked', task));\n    // Add event listener to add style class when task is toggled complete.\n    checkbox.addEventListener('click', () => (0,_index__WEBPACK_IMPORTED_MODULE_1__.toggleClass)(taskEl, 'complete'));\n    // Style checkbox with proj color if displaying All Tasks.\n    if (color) {\n        checkbox.style.boxShadow = '-1px 1px 5px ' + color;\n    }\n    taskEl.appendChild(checkbox);\n\n    // Create and append p element with task name.\n    const name = document.createElement('p');\n    name.textContent = task.name;\n    // Add click listener to display tasks details.\n    name.addEventListener('click', () => displayTaskDetails(task, taskEl));\n    taskEl.appendChild(name);\n\n    // Check if task is complete and add complete styles if so.\n    if (task.isComplete) (0,_index__WEBPACK_IMPORTED_MODULE_1__.toggleClass)(taskEl, 'complete');\n\n    // Append task element to container.\n    tasksContainer.appendChild(taskEl);\n}\n// Listen for event from tasks.js and dom-projects.js\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('taskCreated', displayTask);\n\n// Wipe out all tasks when project is switched.\nfunction removeAllTasks() {\n    // While the container has a child, remove a child.\n    console.log('removing all tasks...');\n    while (tasksContainer.firstChild) {\n        tasksContainer.removeChild(tasksContainer.lastChild);\n    }\n}\n// Listen for event from dom-projects.js\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('projectSwitched', removeAllTasks);\n\n// Display new project's tasks.\nfunction displayAllTasks(project) {\n    if (project.name === 'All Tasks') { // If Master Project\n        // Display each task from each project.\n        project.projects.forEach(childProject => {\n            childProject.tasks.forEach(task => displayTask(task, childProject.color));\n        });\n    }\n    // If normal project, and for unsorted masterProject tasks.\n    project.tasks.forEach(task => displayTask(task));\n}\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('projectSwitched', displayAllTasks);\n\nfunction displayTaskDetails(task, taskEl) {\n    // Create div element and add class.\n    const detailsEl = document.createElement('div');\n    detailsEl.classList.add('task-details');\n\n    // Add task name.\n    const name = document.createElement('h2');\n    name.textContent = task.name;\n    detailsEl.appendChild(name);\n\n    // Add button to hide details.\n    const backBtn = document.createElement('button');\n    backBtn.textContent = 'Go back';\n    // When button is clicked, remove details div.\n    backBtn.addEventListener('click', () => tasksContainer.removeChild(detailsEl));\n    detailsEl.appendChild(backBtn);\n\n    // Add delete button.\n    (function addDeleteBtn() {\n        const deleteBtn = document.createElement('button');\n        deleteBtn.textContent = 'Delete';\n        // When button is clicked...\n        // remove details div,\n        deleteBtn.addEventListener('click', () => tasksContainer.removeChild(detailsEl));\n        // remove task div,\n        deleteBtn.addEventListener('click', () => tasksContainer.removeChild(taskEl));\n        // and emit event to remove task from project.\n        deleteBtn.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.emit('taskDeleted', task));\n        detailsEl.appendChild(deleteBtn);\n    })();\n\n    // Add priority info.\n    (function addPriority() {\n        const priority = document.createElement('div');\n        priority.textContent = 'Priority: ' + task.priority;\n        detailsEl.appendChild(priority);\n    })();\n\n    // Add task description.\n    const desc = document.createElement('p');\n    desc.textContent = task.desc;\n    detailsEl.appendChild(desc);\n\n    // Add edit button\n    (function addEditBtn() {\n        const editBtn = document.createElement('button');\n        editBtn.textContent = 'Edit Task';\n    })();\n\n    // Append details element to container.\n    tasksContainer.appendChild(detailsEl);\n}\n\n\n\n//# sourceURL=webpack://todo/./src/dom-tasks.js?");

/***/ }),

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"events\": () => (/* binding */ events)\n/* harmony export */ });\n// Module to help all modules communicate.\nconst events = {\n    events: {},\n    on: function(eventName, fn) {\n        this.events[eventName] = this.events[eventName] || [];\n        this.events[eventName].push(fn);\n    },\n    off: function(eventName, fn) {\n        if (this.events[eventName]) {\n            for (let i = 0; i < this.events[eventName].length; i++) {\n                if (this.events[eventName][i] === fn) {\n                    this.events[eventName].splice(i, 1);\n                    break;\n                }\n            }\n        }\n    },\n    emit: function(eventName, data){\n        if (this.events[eventName]) {\n            this.events[eventName].forEach(fn => fn(data));\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack://todo/./src/events.js?");

/***/ }),

/***/ "./src/forms.js":
/*!**********************!*\
  !*** ./src/forms.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskForm\": () => (/* binding */ taskForm),\n/* harmony export */   \"Form\": () => (/* binding */ Form)\n/* harmony export */ });\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n\n\n\nclass Form {\n    constructor(type) {\n        this.type = type,\n        // Store the form element as a property.\n        this.el = document.querySelector(`#${type}-form`),\n        // Store an array of form's inputs, including textarea.\n        this.inputs = Array.from(document.querySelectorAll(`#${type}-form input, #${type}-form textarea`)),\n        this.submitBtn = document.querySelector(`#submit-${type}-btn`),\n        this.displayBtn = document.querySelector(`#disp-${type}-form-btn`)\n    }\n    submit() {\n        // Create an array with the input values.\n        const inputValues = this.inputs.map(input => input.value);\n        _events__WEBPACK_IMPORTED_MODULE_0__.events.emit(`${this.type}FormSubmitted`, inputValues);\n    }\n}\n\n// Old code of object's inputs:\n//     // Set form inputs as inner obj properties.\n//     inputs: {\n//         name: document.querySelector('#task-name'),\n//         desc: document.querySelector('#description'),\n//         dueDate: document.querySelector('#due-date'),\n//         priority: document.querySelector('#priority')\n//     },\n//     submit() {\n//         // Create empty args array.\n//         const inputValues = [];\n//         // Loop through inputs properties.\n//         for (let key in this.inputs) {\n//             // Store each input value in the args array.\n//             inputValues.push(this.inputs[key].value)\n//         }\n//         // Emit event with array of input values.\n//         events.emit('formSubmitted', inputValues);\n//     }\n\n// Create objects of both forms.\nconst taskForm = new Form('task');\nconst projectForm = new Form ('project');\n// Store both forms in an array.\nconst forms = [taskForm, projectForm];\n\n// Switches the two form display buttons.\nfunction switchActiveForm() {\n    forms.forEach(form => {\n        (0,_index__WEBPACK_IMPORTED_MODULE_1__.toggleClass)(form.displayBtn, 'hidden');\n    });\n}\n// Function runs when dom-projects emits event that projects list is active.\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('projectsToggled', switchActiveForm);\n\n// Add event listeners to each form's buttons.\nforms.forEach(form => {\n    // Toggle if form is hidden when display/submit button is clicked.\n    form.displayBtn.addEventListener('click', () => (0,_index__WEBPACK_IMPORTED_MODULE_1__.toggleClass)(form.el, 'hidden'));\n    form.submitBtn.addEventListener('click', () => (0,_index__WEBPACK_IMPORTED_MODULE_1__.toggleClass)(form.el, 'hidden'));\n    // Run submit method when submit button is clicked.\n    form.submitBtn.addEventListener('click', () => form.submit());\n});\n\n\n\n\n//# sourceURL=webpack://todo/./src/forms.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"toggleClass\": () => (/* binding */ toggleClass),\n/* harmony export */   \"masterProject\": () => (/* binding */ masterProject),\n/* harmony export */   \"updateLocalStorage\": () => (/* binding */ updateLocalStorage)\n/* harmony export */ });\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ \"./src/tasks.js\");\n/* harmony import */ var _dom_tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-tasks */ \"./src/dom-tasks.js\");\n/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forms */ \"./src/forms.js\");\n/* harmony import */ var _dom_projects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom-projects */ \"./src/dom-projects.js\");\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n\n\n\n\n\n\n\n// Helper fn.\nfunction toggleClass(el, cls) {\n    // Decide if complete class needs to be removed or added.\n    const action = el.classList.contains(cls) ? 'remove' : 'add';\n    // Remove/add the class.\n    el.classList[action](cls);\n}\n\n// Create default project obj to store all tasks.\n// This project will have an array prop to store every other project obj.\nconst masterProject = (0,_projects__WEBPACK_IMPORTED_MODULE_4__.createProject)(['All Tasks', '#73a9bf']);\n\n// Local storage stuff:\n// Function to update projects in local storage.\nfunction updateLocalStorage() {\n    console.log('Local storage updating...');\n    localStorage.setItem('masterproject', JSON.stringify(masterProject)); // Convert array & objects to string.\n}\n// Event listeners for when to update local storage.\n_events__WEBPACK_IMPORTED_MODULE_5__.events.on('projectCreated', updateLocalStorage);\n_events__WEBPACK_IMPORTED_MODULE_5__.events.on('projectUpdated', updateLocalStorage);\n_events__WEBPACK_IMPORTED_MODULE_5__.events.on('taskUpdated', updateLocalStorage);\n// Check if projects exist in local storage.\nif (localStorage.getItem('masterproject')) {\n    const storedMasterProject = JSON.parse(localStorage.getItem('masterproject')); // Parse to un-stringify array.\n    // Add stored unsorted tasks to Master Project.\n    storedMasterProject.tasks.forEach(task => {\n        task = new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task(task.name, task.desc, task.dueDate, task.priority, task.isComplete);\n        masterProject.tasks.push(task);\n    })\n    // Update page with user's projects\n    storedMasterProject.projects.forEach(project => {\n        // Reconstruct task objects into new array.\n        const tasks = project.tasks.map(\n            task => new _tasks__WEBPACK_IMPORTED_MODULE_0__.Task(task.name, task.desc, task.dueDate, task.priority, task.isComplete)\n        );\n        // Reconstruct project objects.\n        project = new _projects__WEBPACK_IMPORTED_MODULE_4__.Project(project.name, project.color, tasks);\n        masterProject.projects.push(project);\n    });\n    console.log(masterProject);\n}\n\n// Display all projects in list on page load.\nmasterProject.projects.forEach(project => (0,_dom_projects__WEBPACK_IMPORTED_MODULE_3__.addProjectToList)(project));\n// Switch to master project on page load.\n_events__WEBPACK_IMPORTED_MODULE_5__.events.emit('projectSwitched', masterProject);\n\n\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Project\": () => (/* binding */ Project),\n/* harmony export */   \"createProject\": () => (/* binding */ createProject)\n/* harmony export */ });\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ \"./src/tasks.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forms */ \"./src/forms.js\");\n\n\n\n\n\nclass Project {\n    constructor(name, color, tasks) {\n        this.name = name;\n        this.color = color;\n        // Project.tasks stores an array with task objs.\n        this.tasks = tasks || [];\n    }\n    // Fn to run when a new task is created.\n    addTask(task) {\n        this.tasks.push(task);\n        console.log(_index__WEBPACK_IMPORTED_MODULE_2__.masterProject);\n        _events__WEBPACK_IMPORTED_MODULE_0__.events.emit('projectUpdated');\n    }\n    // Fn to run when task is deleted.\n    removeTask(task) {\n        const i = this.tasks.indexOf(task);\n        this.tasks.splice(i, 1);\n        _events__WEBPACK_IMPORTED_MODULE_0__.events.emit('projectUpdated');\n    }\n}\n\n// Variable to store project user displays.\nlet activeProject;\n// Fn to switch active project.\nfunction assignActiveProject(project) {\n    console.log(`assigning ${project.name} as active project...`);\n    activeProject = project;\n}\n// Change active project when dom-projects emits event.\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('projectSwitched', assignActiveProject);\n// Event listener to add new tasks to active project.\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('taskCreated', (task) => activeProject.addTask(task));\n// Event listener to remove deleted tasks from active project.\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('taskDeleted', (task) => activeProject.removeTask(task));\n\n// Fn to create a new project and emit an event.\nfunction createProject(args) {\n    console.log(`Creating project ${args[0]}...`);\n    const project = new Project(...args);\n    if (project.name === 'All Tasks') { // If Master Project\n        // Create an array property to store other projects.\n        project.projects = [];\n    } else { // If an other project\n        // Add new project to all projects array.\n        _index__WEBPACK_IMPORTED_MODULE_2__.masterProject.projects.push(project);\n    }\n    // Emit event so dom-projects.js displays project.\n    _events__WEBPACK_IMPORTED_MODULE_0__.events.emit('projectCreated', project);\n\n    return project;\n}\n\n// When form.js submits projects form:\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('projectFormSubmitted', createProject);\n\n\n\n//# sourceURL=webpack://todo/./src/projects.js?");

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Task\": () => (/* binding */ Task),\n/* harmony export */   \"createTask\": () => (/* binding */ createTask)\n/* harmony export */ });\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n\n\nclass Task {\n    constructor(name, desc, dueDate, priority, isComplete) {\n        this.name = name;\n        this.desc = desc;\n        this.dueDate = dueDate;\n        this.priority = priority;\n        this.isComplete = isComplete || false;\n    }\n    toggleComplete() {\n        this.isComplete = !this.isComplete;\n        _events__WEBPACK_IMPORTED_MODULE_0__.events.emit('taskUpdated');\n    }\n}\n\n// Fn to create a new task and emit an event.\nfunction createTask(args) {\n    const task = new Task(...args);\n    console.log(`created task ${task.name}`);\n    _events__WEBPACK_IMPORTED_MODULE_0__.events.emit('taskCreated', task);\n}\n\n// When task-form.js submits form:\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('taskFormSubmitted', createTask);\n// When user clicks checkbox, toggle task complete.\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('checkboxClicked', (task) => task.toggleComplete());\n\n\n\n//# sourceURL=webpack://todo/./src/tasks.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;