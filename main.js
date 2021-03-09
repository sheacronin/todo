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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displayProject\": () => (/* binding */ displayProject)\n/* harmony export */ });\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n\n\n\n\n// Store header in variable.\nconst header = document.querySelector('header');\n// Set header to display project name.\nheader.textContent = _projects__WEBPACK_IMPORTED_MODULE_0__.defaultProject.name;\n\n// Root variable to access CSS variable for proj color.\nconst root = document.documentElement;\n// Set header & footer styles to use project color.\nroot.style.setProperty('--proj-color', _projects__WEBPACK_IMPORTED_MODULE_0__.defaultProject.color);\n\n// Store projects list el in variable.\nconst projectsList = document.querySelector('#projects-list');\n\n// Add stored projects to list.\nfunction displayProject(project) {\n    // Create project element and add class.\n    const el = document.createElement('div');\n    el.classList.add('project');\n    el.style.backgroundColor = project.color + '80';\n    el.textContent = project.name;\n    // Append project element to container.\n    projectsList.appendChild(el);\n}\n// Listen for event from projects.js\n_events__WEBPACK_IMPORTED_MODULE_2__.events.on('projectCreated', displayProject);\n\n// Store button to toggle projects list display.\nconst switchProjBtn = document.querySelector('#switch-proj');\n// Add event listener to button to show projects list.\nswitchProjBtn.addEventListener('click', () => (0,_index__WEBPACK_IMPORTED_MODULE_1__.toggleClass)(projectsList, 'hidden'));\n// Emit event to tell forms that projects list is active/no longer active.\nswitchProjBtn.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_2__.events.emit('projectsToggled'));\n\n\n\n//# sourceURL=webpack://todo/./src/dom-projects.js?");

/***/ }),

/***/ "./src/dom-tasks.js":
/*!**************************!*\
  !*** ./src/dom-tasks.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displayTask\": () => (/* binding */ displayTask)\n/* harmony export */ });\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n// Module purpose: Manage tasks in the DOM.\n\n\n\n// Store tasks container div in a vairable.\nconst tasksContainer = document.querySelector('#tasks-container');\n\n// Fn to add a new task to the DOM.\nfunction displayTask(task) {\n    // Create task element and add class.\n    const taskEl = document.createElement('div');\n    taskEl.classList.add('task');\n    // Create and append checkbox to div element.\n    const checkbox = document.createElement('input');\n    checkbox.setAttribute('type', 'checkbox');\n    // Add event listener to checkbox to toggle completion in tasks.js.\n    checkbox.addEventListener('click', () => _events__WEBPACK_IMPORTED_MODULE_0__.events.emit('checkboxClicked', task));\n    // Add event listener to add style class when task is toggled complete.\n    checkbox.addEventListener('click', (e) => (0,_index__WEBPACK_IMPORTED_MODULE_1__.toggleClass)(e.target.parentNode, 'complete'));\n    taskEl.appendChild(checkbox);\n    // Create and append p element with task title.\n    const title = document.createElement('p');\n    title.textContent = task.title;\n    // Add click listener to display tasks details.\n    title.addEventListener('click', () => displayTaskDetails(task));\n    taskEl.appendChild(title);\n    // Append task element to container.\n    tasksContainer.appendChild(taskEl);\n}\n\nfunction displayTaskDetails(task) {\n    // Create div element and add class.\n    const detailsEl = document.createElement('div');\n    detailsEl.classList.add('task-details');\n    // Add task title.\n    const title = document.createElement('h2');\n    title.textContent = task.title;\n    detailsEl.appendChild(title);\n    // Add button to hide details.\n    const backBtn = document.createElement('button');\n    backBtn.textContent = 'Go back';\n    // When button is clicked, remove details div.\n    backBtn.addEventListener('click', () => tasksContainer.removeChild(detailsEl));\n    detailsEl.appendChild(backBtn);\n    // Add task description.\n    const desc = document.createElement('p');\n    desc.textContent = task.desc;\n    detailsEl.appendChild(desc);\n    // Append details element to container.\n    tasksContainer.appendChild(detailsEl);\n}\n\n// Listen for event from tasks.js\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('taskCreated', displayTask);\n\n\n\n//# sourceURL=webpack://todo/./src/dom-tasks.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"toggleClass\": () => (/* binding */ toggleClass)\n/* harmony export */ });\n/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks */ \"./src/tasks.js\");\n/* harmony import */ var _dom_tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-tasks */ \"./src/dom-tasks.js\");\n/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forms */ \"./src/forms.js\");\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n/* harmony import */ var _dom_projects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom-projects */ \"./src/dom-projects.js\");\n\n\n\n\n\n\n// Helper fn.\nfunction toggleClass(el, cls) {\n    // Decide if complete class needs to be removed or added.\n    const action = el.classList.contains(cls) ? 'remove' : 'add';\n    // Remove/add the class.\n    el.classList[action](cls);\n}\n\n(0,_dom_tasks__WEBPACK_IMPORTED_MODULE_1__.displayTask)(_tasks__WEBPACK_IMPORTED_MODULE_0__.cleanRoom);\n\n// Display all projects on page load.\n_projects__WEBPACK_IMPORTED_MODULE_3__.allProjects.forEach(project => (0,_dom_projects__WEBPACK_IMPORTED_MODULE_4__.displayProject)(project));\n// // Display all tasks in current project on page load.\n// defaultProject.tasks.forEach(task => displayTask);\n\n\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"defaultProject\": () => (/* binding */ defaultProject),\n/* harmony export */   \"allProjects\": () => (/* binding */ allProjects)\n/* harmony export */ });\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n\n\nclass Project {\n    constructor(name, color) {\n        this.name = name;\n        this.color = color;\n        // Project.tasks stores an array with task objs.\n        this.tasks = [];\n    }\n}\n\nconst defaultProject = new Project('All Tasks', '#779cab');\n\n// Store all projects in an array.\nconst allProjects = [defaultProject];\n\n// Local storage stuff:\n// Function to update projects in local storage.\nfunction updateLocalStorage() {\n    localStorage.setItem('allprojects', JSON.stringify(allProjects)); // Convert array & objects to string.\n}\n// Check if projects exist in local storage.\n// !! Move this to index.js?\nif (localStorage.getItem('allprojects')) {\n    // Update page with user's projects\n    const storedProjects = JSON.parse(localStorage.getItem('allprojects')); // Parse to un-stringify array.\n    storedProjects.forEach(project => {\n        // Reconstruct project objects.\n        project = new Project(project.name, project.color);\n        allProjects.push(project);\n    });\n}\n\n// Fn to create a new project and emit an event.\nfunction createProject(args) {\n    const project = new Project(...args);\n    // Add new project to all projects array.\n    allProjects.push(project);\n    // Emit event so dom-projects.js displays project.\n    _events__WEBPACK_IMPORTED_MODULE_0__.events.emit('projectCreated', project);\n    console.log(allProjects);\n}\n\n// When form.js submits projects form:\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('projectFormSubmitted', createProject);\n\ncreateProject(['Todo App', '#FFE66D']);\n\n\n\n\n//# sourceURL=webpack://todo/./src/projects.js?");

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cleanRoom\": () => (/* binding */ cleanRoom),\n/* harmony export */   \"Task\": () => (/* binding */ Task)\n/* harmony export */ });\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ \"./src/events.js\");\n\n\nclass Task {\n    constructor(title, desc, dueDate, priority) {\n        this.title = title;\n        this.desc = desc;\n        this.dueDate = dueDate;\n        this.priority = priority;\n        this.isComplete = false;\n    }\n    toggleComplete() {\n        this.isComplete = !this.isComplete;\n    }\n}\n\nconst cleanRoom = new Task('Clean room', 'I need to clean my room', 'tomorrow', 2);\n\n// Fn to create a new task and emit an event.\nfunction createTask(args) {\n    const task = new Task(...args);\n    _events__WEBPACK_IMPORTED_MODULE_0__.events.emit('taskCreated', task);\n}\n\n// When task-form.js submits form:\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('taskFormSubmitted', createTask);\n// When user clicks checkbox, toggle task complete.\n_events__WEBPACK_IMPORTED_MODULE_0__.events.on('checkboxClicked', (task) => task.toggleComplete());\n\n\n\n//# sourceURL=webpack://todo/./src/tasks.js?");

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